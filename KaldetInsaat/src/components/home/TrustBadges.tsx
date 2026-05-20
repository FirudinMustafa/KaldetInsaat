import { Award, Shield, Clock, CheckCircle } from "lucide-react"

const stats = [
  {
    value: "150+",
    label: "Tamamlanan Proje",
    icon: CheckCircle,
  },
  {
    value: "500K+",
    label: "m² Uygulama Alanı",
    icon: Award,
  },
  {
    value: "25+",
    label: "Yıl Sektör Tecrübesi",
    icon: Clock,
  },
  {
    value: "0",
    label: "İş Kazası",
    icon: Shield,
  },
]

const badges = [
  {
    title: "ISO 9001",
    subtitle: "Kalite Yönetimi",
  },
  {
    title: "İSG",
    subtitle: "İş Güvenliği",
  },
  {
    title: "Zamanında",
    subtitle: "Teslim Garantisi",
  },
]

export function TrustBadges() {
  return (
    <section className="section-padding-sm bg-secondary text-white">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className="text-center p-4 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/60">
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Badges */}
          <div className="flex flex-wrap justify-center lg:justify-end gap-4">
            {badges.map((badge, index) => (
              <div
                key={badge.title}
                className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-3 animate-fade-in-up"
                style={{ animationDelay: `${(index + 4) * 0.1}s` }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-white">{badge.title}</div>
                  <div className="text-xs text-white/60">{badge.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
