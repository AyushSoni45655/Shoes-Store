const Brands = () => {
    const companiesLogo = [
        { name: "Nike", logo: "https://cdn-icons-png.flaticon.com/128/732/732229.png", },
        { name: "Puma", logo: "https://cdn-icons-png.flaticon.com/128/47/47137.png", },
        { name: "Adidas", logo: "https://cdn-icons-png.flaticon.com/512/732/732160.png", },
        { name: "Reebok", logo: "https://pngdownload.io/wp-content/uploads/2025/04/Reebok-Logo-Sportswear-Brand.webp", },
        { name: "Asics", logo: "https://icon2.cleanpng.com/20180614/ab/aa7rf8ltr.webp", },
         { name: "Skechers", logo: "https://e7.pngegg.com/pngimages/786/420/png-clipart-brand-logo-skechers-sneakers-reebok-skechers-logo-text-logo-thumbnail.png", },
        { name: "Under Armour", logo: "https://e7.pngegg.com/pngimages/124/63/png-clipart-shoe-under-armour-sportswear-sneakers-clothing-armour-white-logo.png", },
        { name: "Converse", logo: "https://e7.pngegg.com/pngimages/161/45/png-clipart-converse-logo-converse-logo-icons-logos-emojis-iconic-brands-thumbnail.png", },
        { name: "Vans", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy93zOK818M_FatZ0qdP5v4NlIFfBAl6Ol2w&s", },
        

    ];
    return (
        <>
            <style>{`
                .marquee-inner {
                    animation: marqueeScroll 15s linear infinite;
                }

                .marquee-inner-testimonials {
                    animation: marqueeScroll 35s linear infinite;
                }

                @keyframes marqueeScroll {
                    0% {
                        transform: translateX(0%);
                    }

                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}
            </style>
            <div className="bg-white py-12 h-fit w-full">
               <h3 className=" text-center text-bold text-md sm:text-lg md:text-xl text-black pb-14 font-medium">
                Trusting by leading brands, including —
            </h3>
            <div class="overflow-hidden w-full relative max-w-5xl mx-auto select-none">
                <div class="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />

                <div class="flex marquee-inner will-change-transform max-w-5xl mx-auto">
                    {[...companiesLogo, ...companiesLogo].map((company, index) => (
                        <img key={index} className="mx-11 h-16 object-center object-contain  w-16 bg-white text-white" src={company.logo} alt={company.name} />
                    ))}
                </div>

                <div class="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
            </div>
            </div>
           
        </>
    );
}

export default Brands;