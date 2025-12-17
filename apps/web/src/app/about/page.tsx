export default function AboutPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Про <span className="text-amber-400">нас</span>
          </h1>
          <p className="text-xl text-slate-400">
            Освітня організація, що популяризує Україну у світі
          </p>
        </div>

        {/* Mission */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-amber-400">🎯</span> Наша місія
          </h2>
          <div className="prose prose-invert prose-amber max-w-none">
            <p className="text-slate-300 text-lg leading-relaxed">
              Know Your Ukraine — це освітня платформа, створена для того, щоб відкривати 
              багатство української культури, історії та традицій для людей з усього світу. 
              Ми віримо, що знання про Україну допоможе будувати мости між культурами 
              та сприятиме кращому розумінню нашої країни.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-amber-400">💡</span> Наші цінності
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Автентичність', desc: 'Ми представляємо справжню Україну без стереотипів' },
              { title: 'Освіта', desc: 'Знання — найкращий спосіб змінити світ на краще' },
              { title: 'Спільнота', desc: 'Разом ми сильніші та можемо досягти більшого' },
              { title: 'Інновації', desc: 'Сучасні підходи до збереження традицій' },
            ].map((value) => (
              <div key={value.title} className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
                <h3 className="text-lg font-semibold text-amber-400 mb-2">{value.title}</h3>
                <p className="text-slate-400">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-amber-400">👥</span> Наша команда
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { name: 'Олена Коваленко', role: 'Засновниця', emoji: '👩‍💼' },
              { name: 'Андрій Мельник', role: 'Контент-менеджер', emoji: '👨‍💻' },
              { name: 'Марія Шевченко', role: 'Дизайнер', emoji: '👩‍🎨' },
            ].map((member) => (
              <div key={member.name} className="text-center p-6 bg-slate-800/50 rounded-xl border border-slate-700">
                <div className="text-5xl mb-4">{member.emoji}</div>
                <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                <p className="text-slate-400 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

