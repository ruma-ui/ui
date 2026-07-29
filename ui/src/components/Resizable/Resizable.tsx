import { cn, tw } from "../../lib/utils";
import React, { useCallback, useRef, useState } from "react";

export interface ResizableProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onResize"> {
  /**
   * The content to be made resizable
   */
  children: React.ReactNode;
  /**
   * The initial width of the resizable container
   * @default 300
   */
  defaultWidth?: number;
  /**
   * The initial height of the resizable container
   * @default 200
   */
  defaultHeight?: number;
  /**
   * Minimum width constraint
   * @default 100
   */
  minWidth?: number;
  /**
   * Maximum width constraint
   * @default 800
   */
  maxWidth?: number;
  /**
   * Minimum height constraint
   * @default 100
   */
  minHeight?: number;
  /**
   * Maximum height constraint
   * @default 600
   */
  maxHeight?: number;
  /**
   * Direction of resize handles
   * @default "both"
   */
  direction?: "horizontal" | "vertical" | "both";
  /**
   * Enable/disable resize functionality
   * @default true
   */
  resizable?: boolean;
  /**
   * Callback when size changes
   */
  onResize?: (size: { width: number; height: number }) => void;
  /**
   * Callback when resize starts
   */
  onResizeStart?: () => void;
  /**
   * Callback when resize ends
   */
  onResizeEnd?: (size: { width: number; height: number }) => void;
  /**
   * Custom class name for the container
   */
  className?: string;
  /**
   * Custom class name for resize handles
   */
  handleClassName?: string;
  /**
   * Show resize handles
   * @default true
   */
  showHandles?: boolean;
  /**
   * Handle size in pixels
   * @default 2
   */
  handleSize?: number;
  /**
   * Handle color theme
   * @default "default"
   */
  handleColor?: "default" | "primary" | "secondary";
  /**
   * Show corner handle for resizing both dimensions
   * @default true
   */
  showCornerHandle?: boolean;
  /**
   * Corner handle size in pixels (when different from handleSize)
   * @default 8
   */
  cornerHandleSize?: number;
}

const baseContainer = tw`relative inline-block`;
const baseHandle = tw`absolute z-10 bg-primary/60 opacity-50 transition-all select-none hover:bg-primary/80 hover:opacity-80 active:bg-primary`;

const handleColors = {
  default: tw``,
  primary: tw`bg-primary hover:bg-primary/90 active:bg-primary/80`,
  secondary: tw`bg-foreground/60 hover:bg-foreground/80 active:bg-foreground`,
};

export const Resizable = React.forwardRef<HTMLDivElement, ResizableProps>(
  (
    {
      children,
      defaultWidth = 300,
      defaultHeight = 200,
      minWidth = 100,
      maxWidth = 800,
      minHeight = 100,
      maxHeight = 600,
      direction = "both",
      resizable = true,
      onResize,
      onResizeStart,
      onResizeEnd,
      className = "",
      handleClassName = "",
      showHandles = true,
      handleColor = "default",
      handleSize = 2,
      showCornerHandle = true,
      cornerHandleSize = 8,
      style,
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({
      width: defaultWidth,
      height: defaultHeight,
    });
    const [activeDirection, setActiveDirection] = useState<
      "horizontal" | "vertical" | "both" | null
    >(null);

    React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

    const handleMouseDown = useCallback(
      (direction: "horizontal" | "vertical" | "both") => (e: React.MouseEvent) => {
        e.preventDefault();
        setActiveDirection(direction);
        onResizeStart?.();

        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = size.width;
        const startHeight = size.height;
        let finalSize = { width: startWidth, height: startHeight };

        const handleMouseMove = (e: MouseEvent) => {
          // This is where the stale closure was causing the issue.
          // The `if (!isResizing)` check is removed because this listener
          // is only active during a drag operation.
          let newWidth = startWidth;
          let newHeight = startHeight;

          if (direction === "horizontal" || direction === "both") {
            newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth + (e.clientX - startX)));
          }

          if (direction === "vertical" || direction === "both") {
            newHeight = Math.max(
              minHeight,
              Math.min(maxHeight, startHeight + (e.clientY - startY))
            );
          }

          const newSize = { width: newWidth, height: newHeight };
          finalSize = newSize;

          requestAnimationFrame(() => {
            setSize(newSize);
            onResize?.(newSize);
          });
        };

        const handleMouseUp = () => {
          setActiveDirection(null);
          onResizeEnd?.(finalSize);
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
          document.body.style.userSelect = "";
        };

        document.body.style.userSelect = "none";
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      },
      [
        size.width,
        size.height,
        minWidth,
        maxWidth,
        minHeight,
        maxHeight,
        onResize,
        onResizeStart,
        onResizeEnd,
      ]
    );

    const handleKeyDown = useCallback(
      (direction: "horizontal" | "vertical" | "both") => (e: React.KeyboardEvent) => {
        if (!resizable) return;

        const step = 10;
        let newWidth = size.width;
        let newHeight = size.height;

        switch (e.key) {
          case "ArrowRight":
            if (direction === "horizontal" || direction === "both") {
              newWidth = Math.min(maxWidth, size.width + step);
            }
            break;
          case "ArrowLeft":
            if (direction === "horizontal" || direction === "both") {
              newWidth = Math.max(minWidth, size.width - step);
            }
            break;
          case "ArrowDown":
            if (direction === "vertical" || direction === "both") {
              newHeight = Math.min(maxHeight, size.height + step);
            }
            break;
          case "ArrowUp":
            if (direction === "vertical" || direction === "both") {
              newHeight = Math.max(minHeight, size.height - step);
            }
            break;
          default:
            return;
        }

        e.preventDefault();
        const newSize = { width: newWidth, height: newHeight };
        setSize(newSize);
        onResize?.(newSize);
      },
      [resizable, size, minWidth, maxWidth, minHeight, maxHeight, onResize]
    );

    const containerStyle = {
      width: size.width,
      height: size.height,
    };

    return (
      <div
        ref={containerRef}
        className={cn(baseContainer, className)}
        style={{ ...containerStyle, ...style }}
        onMouseDown={e => {
          if (!(e.target as HTMLElement).classList.contains("handle")) {
            if (!showHandles) {
              handleMouseDown("both")(e);
            }
          }
        }}
        {...props}
      >
        {children}

        {showHandles && resizable && (
          <>
            {(direction === "horizontal" || direction === "both") && (
              <div
                className={cn(
                  baseHandle,
                  handleColors[handleColor],
                  handleClassName,
                  "handle",
                  (activeDirection === "horizontal" || activeDirection === "both") &&
                    "bg-primary ring-ring opacity-100 ring-1"
                )}
                style={{
                  top: 0,
                  right: 0,
                  height: "100%",
                  width: `${handleSize}px`,
                  cursor: "ew-resize",
                }}
                onMouseDown={handleMouseDown("horizontal")}
                onKeyDown={handleKeyDown("horizontal")}
                tabIndex={0}
                role="slider"
                aria-label="Resize width"
                aria-valuemin={minWidth}
                aria-valuemax={maxWidth}
                aria-valuenow={size.width}
              />
            )}

            {(direction === "vertical" || direction === "both") && (
              <div
                className={cn(
                  baseHandle,
                  handleColors[handleColor],
                  handleClassName,
                  "handle",
                  (activeDirection === "vertical" || activeDirection === "both") &&
                    "bg-primary ring-ring opacity-100 ring-1"
                )}
                style={{
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: `${handleSize}px`,
                  cursor: "ns-resize",
                }}
                onMouseDown={handleMouseDown("vertical")}
                onKeyDown={handleKeyDown("vertical")}
                tabIndex={0}
                role="slider"
                aria-label="Resize height"
                aria-valuemin={minHeight}
                aria-valuemax={maxHeight}
                aria-valuenow={size.height}
              />
            )}

            {showCornerHandle && direction === "both" && (
              <div
                className={cn(
                  baseHandle,
                  handleColors[handleColor],
                  handleClassName,
                  "handle",
                  activeDirection === "both" && "bg-primary ring-ring opacity-100 ring-1"
                )}
                style={{
                  bottom: 0,
                  right: 0,
                  width: `${cornerHandleSize || handleSize}px`,
                  height: `${cornerHandleSize || handleSize}px`,
                  cursor: "nwse-resize",
                  zIndex: 15,
                }}
                onMouseDown={handleMouseDown("both")}
                onKeyDown={handleKeyDown("both")}
                tabIndex={0}
                role="slider"
                aria-label="Resize both dimensions"
                aria-valuemin={Math.min(minWidth, minHeight)}
                aria-valuemax={Math.max(maxWidth, maxHeight)}
                aria-valuenow={Math.max(size.width, size.height)}
              />
            )}
          </>
        )}
      </div>
    );
  }
);

Resizable.displayName = "Resizable";
