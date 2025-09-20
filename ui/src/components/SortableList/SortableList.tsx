import { cn, tw } from "../../lib/utils";
import React, { useCallback, useEffect, useState } from "react";
import { FaGripVertical } from "react-icons/fa";

export interface SortableListProps<T = unknown>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * Array of items to display in the sortable list
   */
  items: T[];
  /**
   * Function to render each item. Receives the item, its index, and drag state
   */
  renderItem: (item: T, index: number, isDragging: boolean) => React.ReactNode;
  /**
   * Callback when items are reordered
   */
  onReorder?: (items: T[], fromIndex: number, toIndex: number) => void;
  /**
   * Callback when the order changes (items array is updated)
   */
  onChange?: (items: T[]) => void;
  /**
   * Unique key extractor for items (used for React keys and drag identification)
   */
  getItemKey?: (item: T, index: number) => string;
  /**
   * Whether the list is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Direction of sorting
   * @default "vertical"
   */
  direction?: "vertical" | "horizontal";
  /**
   * Custom drag handle renderer. If not provided, the entire item is draggable
   */
  renderDragHandle?: (item: T, index: number) => React.ReactNode;
  /**
   * Animation duration for reorder transitions
   * @default 200
   */
  animationDuration?: number;
  /**
   * Whether to show real-time preview of changes during drag
   * @default true
   */
  showDragPreview?: boolean;
}

export interface SortableItemProps<T = unknown>
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "children" | "onDragStart" | "onDragEnd" | "onDrop"
  > {
  /**
   * The item data
   */
  item: T;
  /**
   * Item index in the list
   */
  index: number;
  /**
   * Whether the item is currently being dragged
   */
  isDragging: boolean;
  /**
   * Whether the item is being dragged over
   */
  isDragOver: boolean;
  /**
   * Callback to start dragging
   */
  onDragStart: (index: number) => void;
  /**
   * Callback when drag ends
   */
  onDragEnd: () => void;
  /**
   * Callback when item is dropped
   */
  onDrop: (fromIndex: number, toIndex: number) => void;
  /**
   * Direction of sorting
   */
  direction: "vertical" | "horizontal";
  /**
   * Whether the list is disabled
   */
  disabled: boolean;
  /**
   * Custom drag handle renderer
   */
  renderDragHandle?: (item: T, index: number) => React.ReactNode;
  /**
   * Animation duration
   */
  animationDuration: number;
  /**
   * Children renderer
   */
  children: (item: T, index: number, isDragging: boolean) => React.ReactNode;
}

const baseList = tw`relative w-full gap-3 select-none`;

const baseItem = tw`relative cursor-move rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-200 ease-in-out hover:border-gray-300 hover:shadow-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none`;

const draggingItem = tw`z-50 scale-105 rotate-1 border-blue-400 bg-blue-50/30 shadow-xl`;

const dragOverItem = tw`scale-102 bg-blue-50 shadow-lg`;

const disabledItem = tw`cursor-not-allowed border-gray-200 bg-gray-50 opacity-60 hover:border-gray-200 hover:shadow-none`;

const dragHandle = tw`flex cursor-grab items-center justify-center rounded-sm text-gray-400 transition-all duration-200 active:cursor-grabbing disabled:cursor-not-allowed disabled:opacity-50`;

const dragIndicator = tw`pointer-events-none absolute inset-0 rounded-lg border-2 border-blue-400 bg-gradient-to-r from-blue-50 to-blue-100 opacity-0 transition-all duration-200`;

const dropZoneIndicator = tw`pointer-events-none h-1 rounded-full bg-blue-500 opacity-0 transition-all duration-200`;

const keyboardHint = tw`sr-only`;

// Default drag handle icon using react-icons
const DefaultDragHandle: React.FC<{ className?: string }> = ({ className }) => (
  <FaGripVertical className={className} />
);

export const SortableItem = React.forwardRef<HTMLDivElement, SortableItemProps>(
  <T,>(
    {
      item,
      index,
      isDragging,
      isDragOver,
      onDragStart,
      onDragEnd,
      onDrop,
      direction,
      disabled,
      renderDragHandle,
      animationDuration,
      children,
      className,
      style,
      ...props
    }: SortableItemProps<T>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const itemRef = React.useRef<HTMLDivElement | null>(null);
    const dragHandleRef = React.useRef<HTMLButtonElement | null>(null);

    // Combine forwarded ref and local ref
    React.useImperativeHandle(ref, () => itemRef.current as HTMLDivElement);

    const handleDragStart = useCallback(
      (e: React.DragEvent) => {
        if (disabled) return;

        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", index.toString());

        // Add drag image if available
        if (itemRef.current) {
          const rect = itemRef.current.getBoundingClientRect();
          const dragImage = new Image();
          dragImage.src =
            "data:image/svg+xml;base64," +
            btoa(`
                        <svg width="${rect.width}" height="${rect.height}" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.1" />
                                    <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:0.2" />
                                </linearGradient>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grad)" stroke="#3b82f6" stroke-width="2" stroke-dasharray="6,4" rx="8"/>
                            <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#1e40af" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600">↕ Move</text>
                        </svg>
                    `);
          e.dataTransfer.setDragImage(dragImage, rect.width / 2, rect.height / 2);
        }

        onDragStart(index);
      },
      [disabled, index, onDragStart]
    );

    const handleDragEnd = useCallback(() => {
      onDragEnd();
      // Add a subtle success animation
      if (itemRef.current) {
        itemRef.current.style.transform = "scale(1.02)";
        setTimeout(() => {
          if (itemRef.current) {
            itemRef.current.style.transform = "";
          }
        }, 150);
      }
    }, [onDragEnd]);

    const handleDragOver = useCallback(
      (e: React.DragEvent) => {
        if (disabled) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      },
      [disabled]
    );

    const handleDrop = useCallback(
      (e: React.DragEvent) => {
        if (disabled) return;
        e.preventDefault();

        const fromIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
        if (fromIndex !== index) {
          onDrop(fromIndex, index);
        }
      },
      [disabled, index, onDrop]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return;

        switch (e.key) {
          case "ArrowUp":
            e.preventDefault();
            if (direction === "vertical" && index > 0) {
              onDrop(index, index - 1);
            }
            break;
          case "ArrowDown":
            e.preventDefault();
            if (
              direction === "vertical" &&
              index < (itemRef.current?.parentElement?.children.length || 0) - 1
            ) {
              onDrop(index, index + 1);
            }
            break;
          case "ArrowLeft":
            e.preventDefault();
            if (direction === "horizontal" && index > 0) {
              onDrop(index, index - 1);
            }
            break;
          case "ArrowRight":
            e.preventDefault();
            if (
              direction === "horizontal" &&
              index < (itemRef.current?.parentElement?.children.length || 0) - 1
            ) {
              onDrop(index, index + 1);
            }
            break;
          case "Home":
            e.preventDefault();
            if (index > 0) {
              onDrop(index, 0);
            }
            break;
          case "End": {
            e.preventDefault();
            const totalItems = itemRef.current?.parentElement?.children.length || 0;
            if (index < totalItems - 1) {
              onDrop(index, totalItems - 1);
            }
            break;
          }
          case " ":
            e.preventDefault();
            // Focus the drag handle for better accessibility
            dragHandleRef.current?.focus();
            break;
        }
      },
      [disabled, direction, index, onDrop]
    );

    const dragHandleElement = renderDragHandle ? (
      renderDragHandle(item, index)
    ) : (
      <button
        className={cn(
          dragHandle,
          !isDragging && "hover:bg-blue-50 hover:text-blue-600",
          disabled && "cursor-not-allowed opacity-50"
        )}
        ref={dragHandleRef}
        aria-label='Drag to reorder'
        type='button'
        disabled={disabled}
      >
        <DefaultDragHandle />
      </button>
    );

    return (
      <div
        ref={itemRef}
        className={cn(
          baseItem,
          isDragging && draggingItem,
          isDragOver && dragOverItem,
          disabled && disabledItem,
          className
        )}
        style={{
          ...style,
          transitionDuration: `${animationDuration}ms`,
        }}
        draggable={!disabled}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role='listitem'
        aria-label={`Item ${index + 1} of ${itemRef.current?.parentElement?.children.length || 1}`}
        aria-describedby={`sortable-item-${index}-hint`}
        aria-grabbed={isDragging ? "true" : "false"}
        {...props}
      >
        {isDragOver && (
          <div
            className={dragIndicator}
            style={{
              opacity: isDragOver ? 1 : 0,
            }}
          />
        )}

        {/* Subtle border animation for drag over state */}
        {isDragOver && (
          <div className='pointer-events-none absolute inset-0 animate-pulse rounded-lg border-2 border-blue-400' />
        )}

        <div className='flex w-full items-center gap-4 p-3'>
          {!disabled && (
            <div className='flex shrink-0 items-center self-start pt-1'>{dragHandleElement}</div>
          )}
          <div className='min-w-0 flex-1'>{children(item, index, isDragging)}</div>
        </div>

        <div id={`sortable-item-${index}-hint`} className={keyboardHint}>
          Press arrow keys to reorder, Home/End to jump to start/end, Space to grab item
        </div>
      </div>
    );
  }
);

SortableItem.displayName = "SortableItem";

export const SortableList = React.forwardRef<HTMLDivElement, SortableListProps>(
  <T,>(
    {
      items,
      renderItem,
      onReorder,
      onChange,
      getItemKey = (item: T, index: number) => `item-${index}`,
      disabled = false,
      direction = "vertical",
      renderDragHandle,
      animationDuration = 200,
      showDragPreview = true,
      className,
      style,
      ...props
    }: SortableListProps<T>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
    const [localItems, setLocalItems] = useState<T[]>(items);
    const [tempItems, setTempItems] = useState<T[]>(items);
    const listRef = React.useRef<HTMLDivElement | null>(null);

    // Combine forwarded ref and local ref
    React.useImperativeHandle(ref, () => listRef.current as HTMLDivElement);

    // Update temp items for drag preview (only when enabled)
    useEffect(() => {
      if (showDragPreview && draggedIndex !== null && dragOverIndex !== null) {
        // Always update tempItems when dragging, regardless of position
        const newTempItems = [...localItems];
        const [movedItem] = newTempItems.splice(draggedIndex, 1);
        newTempItems.splice(dragOverIndex, 0, movedItem);
        setTempItems(newTempItems);
      } else {
        setTempItems(localItems);
      }
    }, [draggedIndex, dragOverIndex, localItems, showDragPreview]);

    const handleDragStart = useCallback((index: number) => {
      setDraggedIndex(index);
    }, []);

    const handleDragEnd = useCallback(() => {
      setDraggedIndex(null);
      setDragOverIndex(null);
    }, []);

    const handleDragOver = useCallback(
      (index: number) => {
        if (showDragPreview) {
          // When preview is enabled, set dragOverIndex to the target position
          setDragOverIndex(index);
        } else {
          setDragOverIndex(index);
        }
      },
      [showDragPreview]
    );

    const itemsToRender = showDragPreview && draggedIndex !== null ? tempItems : localItems;

    const handleDrop = useCallback(
      (fromIndex: number, toIndex: number) => {
        if (fromIndex === toIndex) return;

        // When preview is enabled, toIndex is the visual position
        // We need to map it back to the original position
        let actualToIndex = toIndex;
        if (showDragPreview && draggedIndex !== null) {
          // Find the original index of the item at the visual drop position
          const itemAtDropPosition = itemsToRender[toIndex];
          actualToIndex = localItems.findIndex(item => item === itemAtDropPosition);
        }

        const newItems = [...localItems];
        const [movedItem] = newItems.splice(fromIndex, 1);
        newItems.splice(actualToIndex, 0, movedItem);

        setLocalItems(newItems);
        onReorder?.(newItems, fromIndex, actualToIndex);
        onChange?.(newItems);
        setDraggedIndex(null);
        setDragOverIndex(null);
      },
      [localItems, onReorder, onChange, showDragPreview, draggedIndex, itemsToRender]
    );

    const handleItemDragOver = useCallback(
      (visualIndex: number, isAfterItem = false) =>
        (e: React.DragEvent) => {
          if (disabled) return;
          e.preventDefault();

          // If hovering over the area after an item, the insertion point is visualIndex + 1
          const insertionIndex = isAfterItem ? visualIndex + 1 : visualIndex;
          handleDragOver(insertionIndex);
        },
      [disabled, handleDragOver]
    );

    return (
      <div
        ref={listRef}
        className={cn(
          baseList,
          direction === "horizontal" && "flex overflow-x-auto p-1",
          direction === "vertical" && "flex flex-col p-1",
          className
        )}
        style={style}
        role='list'
        aria-label='Sortable list'
        {...props}
      >
        {/* Drop zone indicator at the beginning of the list */}
        {draggedIndex !== null && (
          <div
            className={cn(
              dropZoneIndicator,
              direction === "vertical" ? "mx-2 w-full" : "my-2 h-full w-1",
              dragOverIndex === 0 && "opacity-100"
            )}
            onDragOver={handleItemDragOver(-1, true)}
          />
        )}

        {itemsToRender.map((item, index) => {
          // Determine if this item is being dragged
          const isItemDragging =
            draggedIndex !== null &&
            (showDragPreview
              ? item === localItems[draggedIndex] // When preview is enabled, check by item reference
              : draggedIndex === index); // When preview is disabled, check by current index

          return (
            <React.Fragment key={getItemKey(item, index)}>
              <SortableItem
                item={item}
                index={index}
                isDragging={isItemDragging}
                isDragOver={dragOverIndex === index}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDrop={handleDrop}
                direction={direction}
                disabled={disabled}
                renderDragHandle={
                  renderDragHandle as
                    | ((item: unknown, index: number) => React.ReactNode)
                    | undefined
                }
                animationDuration={animationDuration}
                onDragOver={handleItemDragOver(index)}
              >
                {
                  renderItem as (
                    item: unknown,
                    index: number,
                    isDragging: boolean
                  ) => React.ReactNode
                }
              </SortableItem>

              {/* Drop zone indicator after this item */}
              {draggedIndex !== null && index < itemsToRender.length - 1 && (
                <div
                  className={cn(
                    dropZoneIndicator,
                    direction === "vertical" ? "mx-2 w-full" : "my-2 h-full w-1",
                    dragOverIndex === index + 1 && "opacity-100"
                  )}
                  onDragOver={handleItemDragOver(index, true)}
                />
              )}

              {/* Drop zone indicator after last item */}
              {draggedIndex !== null && index === itemsToRender.length - 1 && (
                <div
                  className={cn(
                    dropZoneIndicator,
                    direction === "vertical" ? "mx-2 w-full" : "my-2 h-full w-1",
                    dragOverIndex === itemsToRender.length && "opacity-100"
                  )}
                  onDragOver={handleItemDragOver(index, true)}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }
);

SortableList.displayName = "SortableList";
