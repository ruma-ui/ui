import type { Meta, StoryObj } from "@storybook/react-vite";
import { Rating } from "./Rating";
import { useState } from "react";
import mdx from "./Rating.mdx";
import { tw } from "@/utils/tw";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegStar, FaStar } from "react-icons/fa";
import { BsEmojiNeutral, BsEmojiSmileFill } from "react-icons/bs";

const meta: Meta<typeof Rating> = {
    title: "Components/Rating",
    component: Rating,
    parameters: {
        layout: "centered",
        docs: {
            page: mdx,
        },
    },
    argTypes: {
        value: {
            control: { type: "number", min: 0, max: 5, step: 0.5 },
            description: "The current rating value",
            defaultValue: 0,
        },
        max: {
            control: { type: "number", min: 1, max: 10 },
            description: "The maximum rating value",
            defaultValue: 5,
        },
        size: {
            control: { type: "radio" },
            options: ["xs", "sm", "md", "lg", "xl"],
            description: "The size of the rating stars",
            defaultValue: "md",
            type: {
                name: "enum",
                value: ["xs", "sm", "md", "lg", "xl"],
            },
        },
        variant: {
            control: { type: "radio" },
            options: ["default", "filled", "outline"],
            description: "The visual style of the rating",
            defaultValue: "default",
            type: {
                name: "enum",
                value: ["default", "filled", "outline"],
            },
        },
        precision: {
            control: { type: "radio" },
            options: [0.5, 1],
            description: "Precision for rating values",
            defaultValue: 1,
            type: {
                name: "enum",
                value: [0.5, 1],
            },
        },
        animation: {
            control: { type: "radio" },
            options: ["none", "scale", "glow"],
            description: "Animation effect on user interaction",
            defaultValue: "none",
            type: {
                name: "enum",
                value: ["none", "scale", "glow"],
            },
        },
        readonly: {
            control: "boolean",
            description: "Whether the rating is readonly",
            defaultValue: false,
            type: { name: "boolean" },
        },
        disabled: {
            control: "boolean",
            description: "Whether the rating is disabled",
            defaultValue: false,
            type: { name: "boolean" },
        },
        showValue: {
            control: "boolean",
            description: "Whether to show the rating value as text",
            defaultValue: false,
            type: { name: "boolean" },
        },
        label: {
            control: "text",
            description: "Custom label for the rating",
        },
        onChange: { action: "rating changed" },
        onHover: { action: "rating hovered" },
        emptyIcon: {
            control: false,
            description: "Custom icon for empty/unfilled state",
        },
        filledIcon: {
            control: false,
            description: "Custom icon for filled state",
        },
        colorClassName: {
            control: "text",
            description: "Custom color for the rating icons",
        },
    },
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const Default: Story = {
    render: () => {
        const [rating, setRating] = useState(3);
        return (
            <div className="flex flex-col gap-2">
                <Rating value={rating} onChange={setRating} />
                <p className="text-xs text-gray-500">Current value: {rating}</p>
            </div>
        );
    },
};

export const Interactive: Story = {
    render: () => {
        const [rating, setRating] = useState(1.5);
        return (
            <div className="flex flex-col gap-2">
                <Rating value={rating} onChange={setRating} />
                <p className="text-xs text-gray-500">Current value: {rating}</p>
            </div>
        );
    },
};

export const Sizes: Story = {
    render: () => {
        const [xsRating, setXsRating] = useState(3);
        const [smRating, setSmRating] = useState(3);
        const [mdRating, setMdRating] = useState(3);
        const [lgRating, setLgRating] = useState(3);
        const [xlRating, setXlRating] = useState(3);

        return (
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <Rating size="xs" value={xsRating} onChange={setXsRating} />
                    <span className="text-xs text-gray-600">xs - {xsRating}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <Rating size="sm" value={smRating} onChange={setSmRating} />
                    <span className="text-xs text-gray-600">sm - {smRating}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <Rating size="md" value={mdRating} onChange={setMdRating} />
                    <span className="text-xs text-gray-600">md - {mdRating}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <Rating size="lg" value={lgRating} onChange={setLgRating} />
                    <span className="text-xs text-gray-600">lg - {lgRating}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <Rating size="xl" value={xlRating} onChange={setXlRating} />
                    <span className="text-xs text-gray-600">xl - {xlRating}</span>
                </div>
            </div>
        );
    },
};

export const Variants: Story = {
    render: () => {
        const [defaultRating, setDefaultRating] = useState(4);
        const [filledRating, setFilledRating] = useState(4);
        const [outlineRating, setOutlineRating] = useState(4);

        return (
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <Rating variant="default" value={defaultRating} onChange={setDefaultRating} />
                    <span className="text-xs text-gray-600">default - {defaultRating}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <Rating variant="filled" value={filledRating} onChange={setFilledRating} />
                    <span className="text-xs text-gray-600">filled - {filledRating}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <Rating variant="outline" value={outlineRating} onChange={setOutlineRating} />
                    <span className="text-xs text-gray-600">outline - {outlineRating}</span>
                </div>
            </div>
        );
    },
};

export const WithValue: Story = {
    render: () => {
        const [rating, setRating] = useState(3.5);
        return (
            <div className="flex flex-col gap-2">
                <Rating value={rating} onChange={setRating} showValue max={5} />
                <p className="text-xs text-gray-500">Interactive rating with value display</p>
            </div>
        );
    },
};

export const HalfStars: Story = {
    render: () => {
        const [rating, setRating] = useState(2.5);
        return (
            <div className="flex flex-col gap-2">
                <Rating value={rating} onChange={setRating} precision={0.5} showValue />
                <p className="text-xs text-gray-500">Half-star precision: {rating}</p>
            </div>
        );
    },
};

export const Readonly: Story = {
    args: {
        value: 4,
        readonly: true,
    },
};

export const Disabled: Story = {
    args: {
        value: 3,
        disabled: true,
    },
};

export const WithAnimation: Story = {
    render: () => {
        const [scaleRating, setScaleRating] = useState(3);
        const [glowRating, setGlowRating] = useState(3);
        const [noAnimationRating, setNoAnimationRating] = useState(3);

        return (
            <div className="flex flex-col gap-6">
                <div className="mb-2 text-sm text-gray-600">
                    Hover over or click the stars below to see the animation effects in action. The
                    ratings will update dynamically as you interact with them.
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <h4 className="text-sm font-medium">Scale Animation</h4>
                        <Rating
                            value={scaleRating}
                            animation="scale"
                            onChange={setScaleRating}
                            size="lg"
                        />
                        <p className="text-xs text-gray-500">Current value: {scaleRating}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h4 className="text-sm font-medium">Glow Animation</h4>
                        <Rating
                            value={glowRating}
                            animation="glow"
                            onChange={setGlowRating}
                            size="lg"
                        />
                        <p className="text-xs text-gray-500">Current value: {glowRating}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h4 className="text-sm font-medium">No Animation (Default)</h4>
                        <Rating
                            value={noAnimationRating}
                            animation="none"
                            onChange={setNoAnimationRating}
                            size="lg"
                        />
                        <p className="text-xs text-gray-500">Current value: {noAnimationRating}</p>
                    </div>
                </div>
            </div>
        );
    },
};

export const CustomMax: Story = {
    render: () => {
        const [rating, setRating] = useState(7);
        return (
            <div className="flex flex-col gap-2">
                <Rating value={rating} onChange={setRating} max={10} showValue />
                <p className="text-xs text-gray-500">Custom maximum (10 stars): {rating}/10</p>
            </div>
        );
    },
};

export const Controlled: Story = {
    render: () => {
        const [rating, setRating] = useState(3);
        return (
            <div className="flex flex-col gap-4">
                <Rating value={rating} onChange={setRating} showValue label="Product Rating" />
                <p className="text-sm text-gray-600">Current rating: {rating}</p>
            </div>
        );
    },
};

export const WithHoverFeedback: Story = {
    render: () => {
        const [rating, setRating] = useState(0);
        const [hoverRating, setHoverRating] = useState(0);

        return (
            <div className="flex flex-col gap-4">
                <Rating value={rating} onChange={setRating} onHover={setHoverRating} showValue />
                <div className="text-sm text-gray-600">
                    <p>Current: {rating}</p>
                    <p>Hovered: {hoverRating}</p>
                </div>
            </div>
        );
    },
};

export const ProductReview: Story = {
    render: () => (
        <div className="max-w-md rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-2 text-lg font-semibold">Customer Reviews</h3>
            <div className="mb-4 flex items-center gap-4">
                <Rating value={4.2} precision={0.5} readonly size="sm" />
                <span className="text-2xl font-bold">4.2</span>
                <span className="text-gray-600">(1,234 reviews)</span>
            </div>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-sm">5 stars</span>
                    <div className="mx-3 h-2 flex-1 rounded-full bg-gray-200">
                        <div
                            className="h-2 rounded-full bg-yellow-400"
                            style={{ width: "60%" }}
                        ></div>
                    </div>
                    <span className="text-sm">60%</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm">4 stars</span>
                    <div className="mx-3 h-2 flex-1 rounded-full bg-gray-200">
                        <div
                            className="h-2 rounded-full bg-yellow-400"
                            style={{ width: "25%" }}
                        ></div>
                    </div>
                    <span className="text-sm">25%</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm">3 stars</span>
                    <div className="mx-3 h-2 flex-1 rounded-full bg-gray-200">
                        <div
                            className="h-2 rounded-full bg-yellow-400"
                            style={{ width: "10%" }}
                        ></div>
                    </div>
                    <span className="text-sm">10%</span>
                </div>
            </div>
        </div>
    ),
};

export const CustomStyled: Story = {
    render: () => {
        const [rating, setRating] = useState(4);
        return (
            <div className="flex flex-col gap-2">
                <Rating
                    value={rating}
                    onChange={setRating}
                    className={tw`rounded-lg border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-4`}
                />
                <p className="text-xs text-gray-500">Custom styled rating: {rating}</p>
            </div>
        );
    },
};

export const CustomIcons: Story = {
    render: () => {
        const [heartRating, setHeartRating] = useState(3);
        const [fontAwesomeRating, setFontAwesomeRating] = useState(4);
        const [emojiRating, setEmojiRating] = useState(2);
        const [thumbsRating, setThumbsRating] = useState(4);
        const [interactiveRating, setInteractiveRating] = useState(2.5);

        return (
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Heart Rating</h4>
                    <Rating
                        value={heartRating}
                        onChange={setHeartRating}
                        max={5}
                        emptyIcon={AiOutlineHeart}
                        filledIcon={AiFillHeart}
                        colorClassName="text-red-500"
                    />
                    <p className="text-xs text-gray-500">Hearts: {heartRating}</p>
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">FontAwesome Stars</h4>
                    <Rating
                        value={fontAwesomeRating}
                        onChange={setFontAwesomeRating}
                        max={5}
                        emptyIcon={FaRegStar}
                        filledIcon={FaStar}
                        colorClassName="text-blue-500"
                    />
                    <p className="text-xs text-gray-500">FontAwesome: {fontAwesomeRating}</p>
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Emoji Faces (5 levels)</h4>
                    <Rating
                        value={emojiRating}
                        onChange={setEmojiRating}
                        max={5}
                        emptyIcon={BsEmojiNeutral}
                        filledIcon={BsEmojiSmileFill}
                        colorClassName="text-green-500"
                        size="lg"
                    />
                    <p className="text-xs text-gray-500">Emoji faces: {emojiRating}</p>
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Thumbs Up Rating</h4>
                    <Rating
                        value={thumbsRating}
                        onChange={setThumbsRating}
                        max={5}
                        emptyIcon={({ size, className, onClick, onMouseEnter }) => (
                            <span
                                className={className}
                                style={{ fontSize: size }}
                                onClick={onClick}
                                onMouseEnter={onMouseEnter}
                            >
                                ✋
                            </span>
                        )}
                        filledIcon={({ size, className, onClick, onMouseEnter }) => (
                            <span
                                className={className}
                                style={{ fontSize: size }}
                                onClick={onClick}
                                onMouseEnter={onMouseEnter}
                            >
                                👍
                            </span>
                        )}
                    />
                    <p className="text-xs text-gray-500">Thumbs: {thumbsRating}</p>
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Interactive Custom Icons</h4>
                    <Rating
                        value={interactiveRating}
                        onChange={setInteractiveRating}
                        max={5}
                        emptyIcon={AiOutlineHeart}
                        filledIcon={AiFillHeart}
                        showValue
                        precision={0.5}
                        colorClassName="text-pink-500"
                    />
                    <p className="text-xs text-gray-500">Interactive hearts: {interactiveRating}</p>
                </div>
            </div>
        );
    },
};

export const CustomIconThumbs: Story = {
    render: () => {
        const [rating, setRating] = useState(3);

        // Define proper types for custom icon props
        interface CustomIconProps {
            size?: number | string;
            className?: string;
            onClick?: () => void;
            onMouseEnter?: () => void;
        }

        // Custom thumbs up icon components that can handle events
        const ThumbsUpEmpty = ({ size, className, onClick, onMouseEnter }: CustomIconProps) => (
            <span
                className={className}
                style={{ fontSize: size }}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
            >
                ✋
            </span>
        );

        const ThumbsUpFilled = ({ size, className, onClick, onMouseEnter }: CustomIconProps) => (
            <span
                className={className}
                style={{ fontSize: size }}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
            >
                👍
            </span>
        );

        return (
            <div className="flex flex-col gap-4">
                <h4 className="text-sm font-medium">Thumbs Up Rating (1-5 scale)</h4>
                <Rating
                    value={rating}
                    max={5}
                    onChange={setRating}
                    emptyIcon={ThumbsUpEmpty}
                    filledIcon={ThumbsUpFilled}
                    showValue
                    colorClassName="text-green-600"
                />
                <p className="text-sm text-gray-600">Rating: {rating} out of 5 thumbs up!</p>
            </div>
        );
    },
};

export const CustomColors: Story = {
    render: () => {
        const [blueRating, setBlueRating] = useState(4);
        const [redRating, setRedRating] = useState(3);
        const [purpleRating, setPurpleRating] = useState(4);
        const [indigoRating, setIndigoRating] = useState(2.5);
        const [redComp, setRedComp] = useState(3);
        const [blueComp, setBlueComp] = useState(3);
        const [greenComp, setGreenComp] = useState(3);
        const [purpleComp, setPurpleComp] = useState(3);
        const [pinkComp, setPinkComp] = useState(3);

        return (
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Custom Color Stars</h4>
                    <Rating
                        value={blueRating}
                        onChange={setBlueRating}
                        colorClassName="text-blue-500"
                    />
                    <p className="text-xs text-gray-500">Blue stars: {blueRating}</p>
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Custom Color with Custom Icons</h4>
                    <Rating
                        value={redRating}
                        onChange={setRedRating}
                        emptyIcon={AiOutlineHeart}
                        filledIcon={AiFillHeart}
                        colorClassName="text-red-500"
                    />
                    <p className="text-xs text-gray-500">Red hearts: {redRating}</p>
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Custom Color Thumbs</h4>
                    <Rating
                        value={purpleRating}
                        onChange={setPurpleRating}
                        emptyIcon={({ size, className, onClick, onMouseEnter }) => (
                            <span
                                className={className}
                                style={{ fontSize: size }}
                                onClick={onClick}
                                onMouseEnter={onMouseEnter}
                            >
                                ✋
                            </span>
                        )}
                        filledIcon={({ size, className, onClick, onMouseEnter }) => (
                            <span
                                className={className}
                                style={{ fontSize: size }}
                                onClick={onClick}
                                onMouseEnter={onMouseEnter}
                            >
                                👍
                            </span>
                        )}
                        colorClassName="text-purple-600"
                    />
                    <p className="text-xs text-gray-500">Purple thumbs: {purpleRating}</p>
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Interactive with Custom Color</h4>
                    <Rating
                        value={indigoRating}
                        onChange={setIndigoRating}
                        colorClassName="text-indigo-600"
                        showValue
                        precision={0.5}
                    />
                    <p className="text-xs text-gray-500">Indigo with precision: {indigoRating}</p>
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium">Color Comparison</h4>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col items-center gap-1">
                            <Rating
                                value={redComp}
                                onChange={setRedComp}
                                colorClassName="text-red-500"
                            />
                            <span className="text-xs text-gray-600">Red - {redComp}</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <Rating
                                value={blueComp}
                                onChange={setBlueComp}
                                colorClassName="text-blue-500"
                            />
                            <span className="text-xs text-gray-600">Blue - {blueComp}</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <Rating
                                value={greenComp}
                                onChange={setGreenComp}
                                colorClassName="text-green-500"
                            />
                            <span className="text-xs text-gray-600">Green - {greenComp}</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <Rating
                                value={purpleComp}
                                onChange={setPurpleComp}
                                colorClassName="text-purple-500"
                            />
                            <span className="text-xs text-gray-600">Purple - {purpleComp}</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <Rating
                                value={pinkComp}
                                onChange={setPinkComp}
                                colorClassName="text-pink-500"
                            />
                            <span className="text-xs text-gray-600">Pink - {pinkComp}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
};
