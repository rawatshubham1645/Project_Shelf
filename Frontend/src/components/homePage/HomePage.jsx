import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Briefcase,
  Palette,
  Layout,
  FileEdit,
  Image,
  Clock,
  Target,
  Menu,
  X,
  CheckCircle,
  Rocket,
  Shield,
  BarChart,
  ExternalLink,
  Edit3,
} from "lucide-react";

function NavBar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "dark:glass glass-light" : ""
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <div className="relative group">
              {/* Animated background elements */}
              <div className="absolute -top-5 -left-5 w-20 h-20 bg-gradient-to-r from-orange-500/30 to-yellow-500/30 rounded-full filter blur-xl animate-spin-slow group-hover:animate-pulse"></div>
              <div className="absolute top-2 right-0 w-12 h-12 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full filter blur-lg animate-float animation-delay-200"></div>

              {/* Logo container with animated hover effects */}
              <div className="flex items-center relative z-10 group-hover:scale-105 transition-transform duration-300">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-yellow-500 shadow-lg flex items-center justify-center mr-2 rotate-6 transform-gpu group-hover:rotate-0 transition-all duration-300">
                  <Edit3 className="h-4 w-4 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 mr-[-2px]">
                      Portfolio
                    </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-600 to-orange-400">
                      Builder
                    </span>
                  </span>
                  <div className="h-0.5 w-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full mt-0.5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-1/2 bg-white/50 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="dark:text-white/70 text-black/70 hover:text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="dark:text-white/70 text-black/70 hover:text-primary transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="dark:text-white/70 text-black/70 hover:text-primary transition-colors"
            >
              Pricing
            </a>

            <Button
              variant="outline-bold"
              onClick={() => navigate("/auth/login")}
              className="rounded-full"
            >
              Sign In
            </Button>
            <Button
              variant="3d"
              onClick={() => navigate("/auth/register")}
              className="rounded-full"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="glass"
              size="icon"
              className="rounded-full dark:bg-white/10 bg-black/5"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 dark:text-white text-black" />
              ) : (
                <Menu className="h-5 w-5 text-primary" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 dark:glass glass-light rounded-2xl mt-2 border dark:border-white/10 border-black/10 animate-slide-up">
            <div className="flex flex-col space-y-4 p-4">
              <a
                href="#features"
                className="dark:text-white/70 text-black/70 hover:text-primary transition-colors py-2"
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="dark:text-white/70 text-black/70 hover:text-primary transition-colors py-2"
              >
                Testimonials
              </a>
              <a
                href="#pricing"
                className="dark:text-white/70 text-black/70 hover:text-primary transition-colors py-2"
              >
                Pricing
              </a>
              <div className="pt-4 flex flex-col gap-3">
                <Button
                  variant="outline-bold"
                  onClick={() => navigate("/auth/login")}
                  className="w-full"
                >
                  Sign In
                </Button>
                <Button
                  variant="3d"
                  onClick={() => navigate("/auth/register")}
                  className="w-full"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function FeatureCard({ icon: Icon, title, description, delay }) {
  return (
    <div
      className="p-8 bg-card rounded-2xl border shadow-sm hover:shadow-lg transition-all card-hover animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-16 h-16 dark:bg-primary/10 bg-primary/5 rounded-full flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function TestimonialCard({ name, role, company, quote, delay }) {
  return (
    <div
      className="p-8 bg-card rounded-2xl border shadow-sm hover:shadow-lg transition-all card-hover animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="mb-6">
        <svg
          className="h-8 w-8 text-primary/40"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
      <p className="text-lg mb-6">{quote}</p>
      <div className="flex items-center">
        <div className="h-12 w-12 rounded-full dark:bg-primary/20 bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
          {name.charAt(0)}
        </div>
        <div className="ml-4">
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-muted-foreground">
            {role}, {company}
          </p>
        </div>
      </div>
    </div>
  );
}

function PricingCard({ title, price, features, isPopular, delay }) {
  return (
    <div
      className={`p-8 rounded-2xl border transition-all card-hover animate-slide-up relative ${
        isPopular ? "border-primary dark:bg-primary/5 bg-primary/2" : "bg-card"
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold">
          Most Popular
        </div>
      )}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <div className="mb-6">
        <span className="text-3xl font-bold">${price}</span>
        <span className="text-muted-foreground">/month</span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        variant={isPopular ? "3d" : "outline-bold"}
        size="full"
        className={isPopular ? "" : "border-primary text-primary"}
      >
        {isPopular ? "Get Started" : "Try Free"}
      </Button>
    </div>
  );
}

function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Rocket,
      title: "Powerful Portfolio Builder",
      description:
        "Create complex forms with our intuitive drag-and-drop builder. Add conditional logic with ease.",
      delay: 100,
    },
    {
      icon: Layout,
      title: "Multi-step Forms",
      description:
        "Break long forms into manageable steps. Track progress and completion rates.",
      delay: 200,
    },
    {
      icon: Shield,
      title: "Secure Submissions",
      description:
        "All form submissions are encrypted and securely stored with enterprise-grade security.",
      delay: 300,
    },
    {
      icon: BarChart,
      title: "Advanced Analytics",
      description:
        "Gain insights with comprehensive analytics. Track conversions and user behavior.",
      delay: 400,
    },
    {
      icon: FileEdit,
      title: "Templates Library",
      description:
        "Start quickly with professionally designed templates for any use case.",
      delay: 500,
    },
    {
      icon: Briefcase,
      title: "Business Integration",
      description:
        "Connect with your favorite business tools. Export data seamlessly.",
      delay: 600,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechGrowth",
      quote:
        "PortfolioBuilder completely transformed our lead generation process. We've increased conversion rates by 40% since implementing their forms.",
      delay: 100,
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      company: "SaaS Solutions",
      quote:
        "The conditional logic features are incredible. We're now collecting exactly the data we need without overwhelming our users.",
      delay: 200,
    },
    {
      name: "Jessica Williams",
      role: "Customer Success",
      company: "DataFlow Inc",
      quote:
        "The analytics dashboard gives us insights we never had before. Now we can optimize our forms based on real user behavior.",
      delay: 300,
    },
  ];

  const pricing = [
    {
      title: "Basic",
      price: 0,
      features: [
        "5 Active Forms",
        "100 Monthly Submissions",
        "Basic Form Elements",
        "Email Notifications",
        "CSV Export",
      ],
      isPopular: false,
      delay: 100,
    },
    {
      title: "Professional",
      price: 29,
      features: [
        "Unlimited Forms",
        "10,000 Monthly Submissions",
        "Advanced Form Logic",
        "File Uploads",
        "Priority Support",
        "Advanced Analytics",
      ],
      isPopular: true,
      delay: 200,
    },
    {
      title: "Enterprise",
      price: 79,
      features: [
        "Unlimited Everything",
        "Custom Branding",
        "API Access",
        "Dedicated Support",
        "Advanced Security",
        "Team Collaboration",
      ],
      isPopular: false,
      delay: 300,
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="shape-circle top-20 left-[10%] animate-float"></div>
      <div className="shape-blob right-[5%] top-[30%] animate-float animation-delay-200"></div>
      <div className="shape-circle bottom-[10%] left-[20%] animate-float animation-delay-300"></div>

      <NavBar />

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-32 pb-20">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight animate-slide-up">
              Create Beautiful Portfolio
              <span className="block text-gradient"> in Minutes</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up animation-delay-200">
              The most powerful form builder platform for businesses. Create,
              publish, and analyze forms with advanced logic and comprehensive
              analytics.
            </p>
            <div className="flex flex-wrap gap-4 justify-center animate-slide-up animation-delay-300">
              <Button
                variant="3d"
                size="xl"
                onClick={() => navigate("/auth/register")}
                className="rounded-full"
              >
                Start Building Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="xl"
                variant="outline-bold"
                onClick={() => navigate("/auth/login")}
                className="rounded-full"
              >
                Sign In <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="container mx-auto px-6 mt-16 mb-16 max-w-6xl">
          <div className="relative animate-slide-up animation-delay-500">
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 h-16 bottom-0 top-auto"></div>
            <img
              src="https://ecomm-dev-public.s3.ap-south-1.amazonaws.com/uploads/IMG_2789.JPG"
              alt="PortfolioBuilder Dashboard"
              className="w-full h-auto rounded-2xl shadow-2xl border border-primary/20"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { number: "10K+", label: "Active Users" },
            { number: "1M+", label: "Forms Created" },
            { number: "99.9%", label: "Uptime" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center animate-slide-up p-6 rounded-xl bg-card border shadow-sm"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl font-bold text-gradient mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16" id="features">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 animate-slide-up">
            Powerful Features
          </h2>
          <p className="text-xl text-muted-foreground animate-slide-up animation-delay-200">
            Everything you need to create forms that convert, collect data
            securely, and gain valuable insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div
        className="dark:bg-accent/30 bg-accent/20 py-20 border-y"
        id="testimonials"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 animate-slide-up">
              What Our Customers Say
            </h2>
            <p className="text-xl text-muted-foreground animate-slide-up animation-delay-200">
              Join thousands of satisfied customers who have transformed their
              form experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="container mx-auto px-6 py-20" id="pricing">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 animate-slide-up">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground animate-slide-up animation-delay-200">
            Choose the plan that works for your needs. Start free and upgrade as
            you grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricing.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden py-20">
        <div className="shape-blob absolute left-0 bottom-0 opacity-20"></div>
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-8 dark:bg-gradient-to-r dark:from-primary/20 dark:to-primary/5 bg-gradient-to-r from-primary/10 to-primary/2 p-12 rounded-3xl border border-primary/20 animate-slide-up">
            <h2 className="text-3xl font-bold">
              Ready to Build Amazing Forms?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of businesses that use PortfolioBuilder to create
              beautiful, high-converting forms.
            </p>
            <Button
              variant="3d"
              size="xl"
              onClick={() => navigate("/auth/register")}
              className="rounded-full"
            >
              Get Started Free
            </Button>
            <p className="text-sm text-muted-foreground">
              No credit card required
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="relative mb-6 group">
                {/* Colorful footer logo */}
                <div className="flex items-center relative">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-yellow-500 shadow-lg flex items-center justify-center mr-2 rotate-6 transform-gpu group-hover:rotate-0 transition-all duration-300">
                    <Edit3 className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <span className="text-xl font-bold">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 mr-[-2px]">
                        Portfolio
                      </span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-600 to-orange-400">
                        Builder
                      </span>
                    </span>
                    <div className="h-0.5 w-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full mt-0.5 relative overflow-hidden">
                      <div className="absolute top-0 left-0 h-full w-1/2 bg-white/50 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
                {/* Small subtle glow */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-full filter blur-xl opacity-70"></div>
              </div>
              <p className="text-muted-foreground mb-6">
                The most powerful form building platform for professionals.
              </p>
            </div>

            {[
              {
                title: "Product",
                links: [
                  "Features",
                  "Templates",
                  "Integrations",
                  "Pricing",
                  "Examples",
                ],
              },
              {
                title: "Resources",
                links: [
                  "Documentation",
                  "Guides",
                  "Support",
                  "API Reference",
                  "Status",
                ],
              },
              {
                title: "Company",
                links: ["About", "Careers", "Blog", "Press", "Contact"],
              },
            ].map((column, idx) => (
              <div key={idx}>
                <h3 className="font-bold mb-6">{column.title}</h3>
                <ul className="space-y-4">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground mb-4 md:mb-0">
              &copy; {new Date().getFullYear()}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
                PortfolioBuilder
              </span>
              . All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
