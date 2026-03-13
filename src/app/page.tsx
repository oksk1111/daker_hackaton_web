import HeroCard from '@/components/common/HeroCard';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section - Freshworks style */}
      <div className="max-w-6xl mx-auto px-4 pt-20 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left: Text */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4 leading-tight tracking-tight">
              Simple yet scalable hackathon{' '}
              <span className="text-[#7C3AED]">platform</span> for all teams
            </h1>
            <p className="text-lg text-neutral-500 max-w-xl mb-8">
              One hackathon platform for the entire community.
              <br />
              Participate, build teams, and compete on the leaderboard.
            </p>
            <a
              href="/hackathons"
              className="btn-primary inline-block uppercase tracking-wider text-sm"
            >
              Get Started
            </a>
          </div>

          {/* Right: Illustration */}
          <div className="flex-1 flex justify-center">
            <Image
              src="/images/hero-illustration.svg"
              alt="Hackathon Platform Illustration"
              width={500}
              height={375}
              priority
            />
          </div>
        </div>
      </div>

      {/* Hero Cards */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <HeroCard
            href="/hackathons"
            title="Hackathons"
            description="Browse ongoing and upcoming hackathons. Diverse topics and challenges await you."
            color="purple"
          />
          <HeroCard
            href="/camp"
            title="Find Teams"
            description="Find teammates or create your own team. Recruit members for various positions."
            color="blue"
          />
          <HeroCard
            href="/rankings"
            title="Rankings"
            description="Check the global rankings. See point standings based on participation and achievements."
            color="green"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="bg-neutral-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-[#7C3AED]">3+</p>
              <p className="text-sm text-neutral-500 mt-1">Hackathons</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#7C3AED]">4+</p>
              <p className="text-sm text-neutral-500 mt-1">Teams</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#7C3AED]">10+</p>
              <p className="text-sm text-neutral-500 mt-1">Participants</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
