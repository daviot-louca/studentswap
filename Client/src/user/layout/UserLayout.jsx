import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  {
    label: "Accueil",
    to: "/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10Z"
        />
      </svg>
    ),
  },
  {
    label: "Recherche",
    to: "/search",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="6.5" />
        <path strokeLinecap="round" d="m16 16 4.5 4.5" />
      </svg>
    ),
  },
  {
    label: "Publier",
    to: "/create",
    isCreate: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" d="M12 5v14M5 12h14" />
      </svg>
    ),
  },
  {
    label: "Messages",
    to: "/messages",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H7l-4 2 1.2-4A7.5 7.5 0 1 1 20 11.5Z"
        />
      </svg>
    ),
  },
  {
    label: "Profil",
    to: "/profile",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="3.2" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.5 20a6.5 6.5 0 0 1 13 0"
        />
      </svg>
    ),
  },
];

function UserLayout() {
  return (
    <div className="min-h-screen bg-background text-text">
      <div className="mx-auto min-h-screen w-full max-w-2xl bg-background pb-24">
        <header className="sticky top-0 z-40 border-b border-gray-100/80 bg-background/95 px-5 py-4 backdrop-blur">
          <div className="flex items-center justify-between">
            <NavLink to="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-lg font-bold text-white shadow-sm">
                S
              </span>

              <span className="font-display text-lg font-bold tracking-tight text-text">
                StudentSwap
              </span>
            </NavLink>

            <button
              type="button"
              aria-label="Notifications"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-muted shadow-sm ring-1 ring-gray-100 transition hover:text-primary"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4"
                />
              </svg>
            </button>
          </div>
        </header>

        <main className="px-4 py-5 sm:px-6">
          <Outlet />
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-100 bg-white/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_30px_rgba(23,25,35,0.06)] backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-end justify-around">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex min-w-14 flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[11px] font-medium transition ${
                  item.isCreate
                    ? "-mt-5"
                    : isActive
                      ? "text-primary"
                      : "text-muted hover:text-text"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.isCreate ? (
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/25 ring-4 ring-background transition hover:bg-primary-dark">
                      <span className="h-6 w-6">{item.icon}</span>
                    </span>
                  ) : (
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-lg transition ${
                        isActive ? "bg-primary/10" : ""
                      }`}
                    >
                      <span className="h-5 w-5">{item.icon}</span>
                    </span>
                  )}

                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default UserLayout;