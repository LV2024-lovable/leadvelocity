
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";

const logos = [
  { src: "/lovable-uploads/69acc9fc-714e-4189-84bc-0e1ab867220d.png", alt: "First Logo" },
  { src: "/lovable-uploads/4effe16c-cb22-49f3-97fe-d54a693f5ac4.png", alt: "Second Logo" },
  { src: "/lovable-uploads/6162ffe3-f10a-4dc9-836d-391e82e4579e.png", alt: "Third Logo" },
  { src: "/lovable-uploads/b88d7723-4aa4-407f-b980-e0f79df261c8.png", alt: "Fourth Logo" },
  { src: "/lovable-uploads/da8f5341-ae9e-4e9e-a9ba-e2acd437dd17.png", alt: "Fifth Logo" },
  { src: "/lovable-uploads/2b5e6463-7d73-4720-99b9-433e23abaeb1.png", alt: "Sixth Logo" },
  { src: "/lovable-uploads/7918a5b9-7449-4de8-b1db-495daf9c4115.png", alt: "Seventh Logo" },
  { src: "/lovable-uploads/1ac7b6fe-edc8-4c4f-a131-662da2825fad.png", alt: "Eighth Logo" },
  { src: "/lovable-uploads/9db3b79c-b5f3-4d25-8de1-d9a1f461f1ac.png", alt: "Ninth Logo" },
  { src: "/lovable-uploads/8762bb5e-9150-4079-b9cc-aea62c22d215.png", alt: "Tenth Logo" },
  { src: "/lovable-uploads/f7d05c76-263c-4f74-b152-ae0f4cfe092b.png", alt: "Eleventh Logo" },
  { src: "/lovable-uploads/ac6a0723-2e66-4c17-8f43-b7fcaf61785d.png", alt: "Twelfth Logo" }
];

const LogoCarousel = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="w-full py-16 overflow-hidden bg-velocity-gray">
      <Carousel className="w-full" opts={{ loop: true, align: "start", dragFree: true }}>
        <CarouselContent className={isMobile ? "animate-carousel-fast" : "animate-carousel"}>
          {[...logos, ...logos].map((logo, i) => (
            <CarouselItem key={i} className="basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4">
              <div className="flex items-center justify-center h-[200px]">
                <img 
                  src={logo.src} 
                  alt={logo.alt}
                  className="max-h-[200px] w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
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
