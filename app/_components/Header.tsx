import Image from 'next/image';
import MobileMenu from './MobileMenu'; // Import the client component
import Link from 'next/link';

type HeaderProps = {
  variant?: 'transparent' | 'filled';
  logoText?: string;
  links?: { label: string; href: string }[];
  noMargin?: boolean;
};

export const Header = ({ 
  variant = 'transparent', 
  logoText = "Save Sierra Madre",
  links = [
    // { label: "About SSMNAI", href: "/about" },
    // { label: "Publications", href: "/publications" },
    // { label: "Signee Notes", href: "/signee-notes" }
  ],
  noMargin = false
}: HeaderProps) => {
  
  const isFilled = variant === 'filled';

  // Define styles here to pass them down
  const containerClasses = isFilled 
    ? "bg-[#386641] text-white" 
    : "bg-white text-[#487948]";
    
  const buttonClasses = isFilled
    ? "bg-[#e9f5db] text-[#1a2e1c] hover:bg-white"
    : "bg-[#457b4d] text-white hover:bg-[#386641]";

  const textColor = isFilled ? "text-white" : "text-black/80 hover:text-black";

  const marginClass = noMargin ? '' : 'mb-6';

  return (
    <header className={`w-full py-6 px-8 md:px-12 flex items-center justify-between transition-colors relative z-50 ${containerClasses} ${marginClass}`}>
      
      {/* Logo Section */}
      <Link href="/" className="flex items-center gap-4">
        <div className="relative h-10 w-14">
            <Image 
                src="/logo.png" 
                alt="SSMNAI Logo" 
                fill 
                className="object-contain"
                priority
            />
        </div>
        <span className={`hidden md:flex font-bold text-xl md:text-2xl tracking-tight ${isFilled ? 'text-white' : 'text-[#487948]'}`}>
          {logoText}
        </span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8 md:gap-12"> 
        {links.map((link) => (
          <a 
            key={link.label} 
            href={link.href} 
            className={`text-lg font-medium transition-colors ${textColor}`}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Desktop Action Button */}
      <div className="hidden md:block">
          <button className={`px-8 py-3 rounded-lg font-semibold text-lg transition-all ${buttonClasses}`}>
              Sign the Petition
          </button>
      </div>

      {/* Mobile Menu (Client Component) */}
      <MobileMenu 
        links={links} 
        containerClasses={containerClasses} 
        buttonClasses={buttonClasses} 
      />

    </header>
  );
};