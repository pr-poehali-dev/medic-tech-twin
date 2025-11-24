import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import CheckupTab from '@/components/schedule/CheckupTab';
import VaccinationTab from '@/components/schedule/VaccinationTab';
import ScreeningTab from '@/components/schedule/ScreeningTab';

interface Checkup {
  age: string;
  period: string;
  examinations: string[];
  specialists: string[];
  completed: boolean;
  nextDate?: string;
}

interface Vaccination {
  vaccine: string;
  age: string;
  doses: number;
  description: string;
  completed: boolean;
  nextDate?: string;
  isRecommended: boolean;
}

const HealthSchedule = () => {
  const currentAge = 29;

  const checkupSchedule: Checkup[] = [
    {
      age: '18-39 лет',
      period: 'Каждые 3 года',
      examinations: [
        'Общий анализ крови',
        'Биохимический анализ крови',
        'Общий анализ мочи',
        'ЭКГ',
        'Флюорография',
        'Измерение артериального давления',
        'Определение уровня глюкозы',
        'Определение холестерина'
      ],
      specialists: [
        'Терапевт',
        'Гинеколог (для женщин)',
        'Стоматолог',
        'Офтальмолог'
      ],
      completed: true,
      nextDate: '2025-11-15'
    },
    {
      age: '40-64 лет',
      period: 'Ежегодно',
      examinations: [
        'Общий анализ крови',
        'Биохимический анализ крови',
        'Общий анализ мочи',
        'ЭКГ',
        'Флюорография (1 раз в 2 года)',
        'Маммография (для женщин)',
        'Измерение ВГД (внутриглазное давление)',
        'Колоноскопия (1 раз в 5 лет)',
        'Определение уровня глюкозы',
        'Определение холестерина'
      ],
      specialists: [
        'Терапевт',
        'Кардиолог',
        'Гинеколог (для женщин)',
        'Невролог',
        'Стоматолог',
        'Офтальмолог',
        'Уролог (для мужчин)'
      ],
      completed: false,
      nextDate: '2036-01-01'
    },
    {
      age: '65+ лет',
      period: 'Ежегодно',
      examinations: [
        'Общий анализ крови',
        'Биохимический анализ крови',
        'Общий анализ мочи',
        'ЭКГ',
        'Эхокардиография',
        'Флюорография',
        'Маммография (для женщин)',
        'УЗИ органов брюшной полости',
        'Колоноскопия (1 раз в 5 лет)',
        'Измерение ВГД',
        'Денситометрия (плотность костей)',
        'Определение уровня глюкозы',
        'Определение холестерина'
      ],
      specialists: [
        'Терапевт',
        'Кардиолог',
        'Невролог',
        'Гинеколог (для женщин)',
        'Офтальмолог',
        'Стоматолог',
        'Уролог (для мужчин)',
        'Эндокринолог'
      ],
      completed: false
    }
  ];

  const vaccinationSchedule: Vaccination[] = [
    {
      vaccine: 'Грипп',
      age: 'Ежегодно',
      doses: 1,
      description: 'Защита от сезонного гриппа. Особенно важна для людей с хроническими заболеваниями.',
      completed: true,
      nextDate: '2025-09-01',
      isRecommended: true
    },
    {
      vaccine: 'COVID-19',
      age: 'По графику',
      doses: 1,
      description: 'Ревакцинация каждые 6-12 месяцев. Актуальный штамм.',
      completed: true,
      nextDate: '2025-06-15',
      isRecommended: true
    },
    {
      vaccine: 'Столбняк и дифтерия (АДС-М)',
      age: 'Каждые 10 лет',
      doses: 1,
      description: 'Обязательная ревакцинация взрослых. Следующая доза в 39 лет.',
      completed: true,
      nextDate: '2034-01-10',
      isRecommended: true
    },
    {
      vaccine: 'Корь, краснуха, паротит',
      age: 'До 35 лет (при отсутствии иммунитета)',
      doses: 2,
      description: 'Если не болели и не вакцинированы в детстве. Особенно важно для женщин детородного возраста.',
      completed: true,
      isRecommended: false
    },
    {
      vaccine: 'Гепатит В',
      age: 'При отсутствии вакцинации',
      doses: 3,
      description: 'Рекомендуется всем взрослым, особенно медработникам и людям из групп риска.',
      completed: true,
      isRecommended: false
    },
    {
      vaccine: 'Гепатит А',
      age: 'По показаниям',
      doses: 2,
      description: 'Рекомендуется путешественникам и людям с заболеваниями печени.',
      completed: false,
      isRecommended: false
    },
    {
      vaccine: 'Пневмококковая инфекция',
      age: '65+ лет или по показаниям',
      doses: 1,
      description: 'Защита от пневмонии. Рекомендуется людям с хроническими заболеваниями.',
      completed: false,
      isRecommended: false
    },
    {
      vaccine: 'Опоясывающий лишай (герпес зостер)',
      age: '50+ лет',
      doses: 2,
      description: 'Профилактика опоясывающего лишая и постгерпетической невралгии.',
      completed: false,
      isRecommended: false
    },
    {
      vaccine: 'Клещевой энцефалит',
      age: 'По показаниям',
      doses: 3,
      description: 'Для жителей эндемичных регионов и любителей активного отдыха на природе.',
      completed: false,
      isRecommended: false
    },
    {
      vaccine: 'Менингококковая инфекция',
      age: 'По показаниям',
      doses: 1,
      description: 'Рекомендуется призывникам, студентам общежитий, путешественникам в Африку.',
      completed: false,
      isRecommended: false
    }
  ];

  const ageBasedVaccinations = [
    {
      ageGroup: '18-29 лет',
      vaccines: ['Грипп (ежегодно)', 'COVID-19', 'АДС-М (каждые 10 лет)', 'Корь, краснуха, паротит (если не привиты)'],
      isCurrentAge: true
    },
    {
      ageGroup: '30-39 лет',
      vaccines: ['Грипп (ежегодно)', 'COVID-19', 'АДС-М (в 39 лет)', 'Гепатит B (если не привиты)'],
      isCurrentAge: false
    },
    {
      ageGroup: '40-49 лет',
      vaccines: ['Грипп (ежегодно)', 'COVID-19', 'АДС-М (в 49 лет)'],
      isCurrentAge: false
    },
    {
      ageGroup: '50-64 лет',
      vaccines: ['Грипп (ежегодно)', 'COVID-19', 'АДС-М (каждые 10 лет)', 'Опоясывающий лишай (с 50 лет)', 'Пневмококковая (по показаниям)'],
      isCurrentAge: false
    },
    {
      ageGroup: '65+ лет',
      vaccines: ['Грипп (ежегодно)', 'COVID-19', 'АДС-М (каждые 10 лет)', 'Пневмококковая инфекция', 'Опоясывающий лишай'],
      isCurrentAge: false
    }
  ];

  const screeningByAge = [
    {
      category: 'Женское здоровье',
      icon: 'Heart',
      screenings: [
        { name: 'Маммография', age: '40+', frequency: 'Каждые 1-2 года', current: false },
        { name: 'Мазок на онкоцитологию (Пап-тест)', age: '21-65', frequency: 'Каждые 3 года', current: true },
        { name: 'Денситометрия (остеопороз)', age: '65+', frequency: 'По показаниям', current: false }
      ]
    },
    {
      category: 'Сердечно-сосудистая система',
      icon: 'HeartPulse',
      screenings: [
        { name: 'Измерение АД', age: '18+', frequency: 'При каждом визите', current: true },
        { name: 'Липидограмма (холестерин)', age: '20+', frequency: 'Каждые 5 лет', current: true },
        { name: 'ЭКГ', age: '40+', frequency: 'Ежегодно', current: false }
      ]
    },
    {
      category: 'Онкоскрининг',
      icon: 'ShieldAlert',
      screenings: [
        { name: 'Колоноскопия', age: '45+', frequency: 'Каждые 5-10 лет', current: false },
        { name: 'Анализ кала на скрытую кровь', age: '50+', frequency: 'Ежегодно', current: false },
        { name: 'Дерматоскопия (осмотр родинок)', age: 'Любой', frequency: 'Ежегодно', current: true }
      ]
    },
    {
      category: 'Эндокринная система',
      icon: 'Activity',
      screenings: [
        { name: 'Глюкоза крови натощак', age: '45+', frequency: 'Каждые 3 года', current: false },
        { name: 'HbA1c (гликированный гемоглобин)', age: 'По показаниям', frequency: 'Каждые 3-6 месяцев', current: true },
        { name: 'ТТГ (функция щитовидной железы)', age: '35+', frequency: 'Каждые 5 лет', current: false }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">График диспансеризации и вакцинации</h2>
        <p className="text-muted-foreground">
          Планирование медицинских обследований и прививок в зависимости от возраста
        </p>
      </div>

      <Tabs defaultValue="checkups" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="checkups" className="gap-2">
            <Icon name="CalendarCheck" size={16} />
            <span className="hidden sm:inline">Диспансеризация</span>
            <span className="sm:hidden">Осмотры</span>
          </TabsTrigger>
          <TabsTrigger value="vaccinations" className="gap-2">
            <Icon name="Syringe" size={16} />
            <span className="hidden sm:inline">Вакцинация</span>
            <span className="sm:hidden">Прививки</span>
          </TabsTrigger>
          <TabsTrigger value="screenings" className="gap-2">
            <Icon name="FileSearch" size={16} />
            <span className="hidden sm:inline">Скрининги</span>
            <span className="sm:hidden">Тесты</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="checkups" className="space-y-4">
          <CheckupTab checkupSchedule={checkupSchedule} currentAge={currentAge} />
        </TabsContent>

        <TabsContent value="vaccinations" className="space-y-4">
          <VaccinationTab 
            vaccinationSchedule={vaccinationSchedule} 
            ageBasedVaccinations={ageBasedVaccinations}
          />
        </TabsContent>

        <TabsContent value="screenings" className="space-y-4">
          <ScreeningTab screeningByAge={screeningByAge} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthSchedule;
