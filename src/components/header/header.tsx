import { component$, useSignal } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  const isMenuOpen = useSignal(false);

  return (
    <header class="bg-white border-b border-gray-200">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 justify-between items-center">
          <Link href="/" class="text-lg sm:text-xl font-semibold text-black">
            Robots.txt Analyzer
          </Link>
          
          {/* Desktop Navigation */}
          <nav class="hidden md:flex items-center space-x-8">
            <Link href="/analyzer" class="text-sm font-medium text-gray-700 hover:text-black transition-colors">
              Analyzer
            </Link>
            <Link href="/compare" class="text-sm font-medium text-gray-700 hover:text-black transition-colors">
              Compare
            </Link>
            <Link href="/history" class="text-sm font-medium text-gray-700 hover:text-black transition-colors">
              History
            </Link>
            <Link href="/about" class="text-sm font-medium text-gray-700 hover:text-black transition-colors">
              About
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick$={() => isMenuOpen.value = !isMenuOpen.value}
            class="md:hidden p-2 text-gray-700 hover:text-black"
            aria-label="Menu"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen.value ? (
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen.value && (
          <nav class="md:hidden py-4 border-t border-gray-200">
            <div class="flex flex-col space-y-4">
              <Link 
                href="/analyzer" 
                class="text-base font-medium text-gray-700 hover:text-black transition-colors px-2"
                onClick$={() => isMenuOpen.value = false}
              >
                Analyzer
              </Link>
              <Link 
                href="/compare" 
                class="text-base font-medium text-gray-700 hover:text-black transition-colors px-2"
                onClick$={() => isMenuOpen.value = false}
              >
                Compare
              </Link>
              <Link 
                href="/history" 
                class="text-base font-medium text-gray-700 hover:text-black transition-colors px-2"
                onClick$={() => isMenuOpen.value = false}
              >
                History
              </Link>
              <Link 
                href="/about" 
                class="text-base font-medium text-gray-700 hover:text-black transition-colors px-2"
                onClick$={() => isMenuOpen.value = false}
              >
                About
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
});
