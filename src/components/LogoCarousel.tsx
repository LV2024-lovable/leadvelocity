
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const logos = [
  { src: "/lovable-uploads/2ddf05ef-b445-4e82-a2bb-a84fc5e777ce.png", alt: "Cowboys Logo" },
  { src: "/lovable-uploads/c4b0893b-5d37-43ae-b56d-927cd8ebae4c.png", alt: "Solar Access Logo" },
  { src: "/lovable-uploads/abc5f770-794a-4ce4-abf6-35b479647f14.png", alt: "Creative ICT Logo" },
  { src: "/lovable-uploads/d63c7d5b-2ebe-4fd7-8825-ef6bdb828ba7.png", alt: "Faslet Logo" },
  { src: "/lovable-uploads/f14628e4-bf2a-45db-8029-49f246c685f2.png", alt: "Cape Logo" }
];

const LogoCarousel = () => {
  return (
    <div className="w-full py-8 overflow-hidden bg-[#0A1724]">
      <Carousel className="w-full" opts={{ loop: true, align: "start", dragFree: true }}>
        <CarouselContent className="animate-carousel">
          {[...logos, ...logos].map((logo, i) => (
            <CarouselItem key={i} className="basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4">
              <div className="flex items-center justify-center h-20">
                <img 
                  src={logo.src} 
                  alt={logo.alt}
                  className="max-h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default LogoCarousel;
