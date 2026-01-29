import React from "react";

const Testimonials = () => {
    const [tooltip, setTooltip] = React.useState({ visible: false, x: 0, y: 0, text: '' });
    const cardRefs = React.useRef([]);

    const handleMouseMove = (e, index) => {
        const bounds = cardRefs.current[index].getBoundingClientRect();
        setTooltip({
            visible: true,
            x: e.clientX - bounds.left,
            y: e.clientY - bounds.top,
            text: testimonials[index].name,
        });
    };

    const handleMouseLeave = () => {
        setTooltip({ ...tooltip, visible: false });
    };

    const testimonials = [
        {
    heading: "Super Comfortable & Stylish",
    message:
      "I’ve worn many brands, but these shoes are on another level. Perfect comfort for daily wear and workouts.",
    name: "Reena Mehta",
    title: "Fitness Trainer",
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop',
  },
  {
    heading: "Best Quality for the Price",
    message:
      "The build quality and design exceeded my expectations. Totally worth every penny.",
    name: "Ananya Sharma",
    title: "Fashion Blogger",
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
  },
  {
    heading: "Perfect Fit, Every Time",
    message:
      "I ordered online and the fit was spot on. Delivery was fast and the packaging was premium.",
    name: "Aman Verma",
    title: "Software Engineer",
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
  },
    ]


    return (
        <>
            <h1 className="text-center text-4xl font-bold mt-10 text-gray-900">What Our Customers Say</h1>
            <p className="text-center text-gray-500 mt-1">
                Real experiences from people who trust our shoes for comfort, style, and performance.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 py-16">
                {testimonials.map((testimonial, index) => (
                    <div key={index} ref={(el) => (cardRefs.current[index] = el)}
                        onMouseMove={(e) => handleMouseMove(e, index)}
                        onMouseLeave={handleMouseLeave}
                        className="relative border border-gray-200 rounded-lg overflow-hidden max-w-sm hover:shadow-lg transition-shadow duration-300"
                    >
                        {tooltip.visible && tooltip.text === testimonial.name && (
                            <span className="absolute px-2.5 py-1 text-sm rounded text-nowrap bg-indigo-500 text-white pointer-events-none transition-all duration-300"
                                style={{ top: tooltip.y + 8, left: tooltip.x + 8, transition: 'all 0.3s ease-out', animationDelay: '0.2s', }} >
                                {tooltip.text}
                            </span>
                        )}

                        <div className="flex flex-col items-center justify-center p-8 text-center">
                            <div className="mb-4 text-gray-500">
                                <h3 className="text-lg font-semibold text-gray-900">{testimonial.heading}</h3>
                                <p className="my-4 text-sm line-clamp-3">{testimonial.message}</p>
                            </div>
                            <div className="flex items-center justify-center">
                                <img className="rounded-full w-9 h-9"
                                    src={testimonial.image}
                                    alt={`${testimonial.name} profile`}
                                />
                                <div className="space-y-0.5 font-medium text-left ml-3">
                                    <p>{testimonial.name}</p>
                                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Testimonials;