import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import PatientHeader from '@/components/doctor/PatientHeader';
import OverviewTab from '@/components/doctor/OverviewTab';
import MedicalRecordsTab from '@/components/doctor/MedicalRecordsTab';
import LabsAndNotesTab from '@/components/doctor/LabsAndNotesTab';

interface Appointment {
  date: string;
  time: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

interface Prescription {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  startDate: string;
  status: 'active' | 'completed' | 'cancelled';
}

interface Diagnosis {
  id: string;
  date: string;
  code: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  status: 'active' | 'resolved';
}

const DoctorPanel = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [clinicalNote, setClinicalNote] = useState('');

  const appointments: Appointment[] = [
    { date: '24 ноя 2024', time: '10:00', type: 'Плановый осмотр', status: 'scheduled' },
    { date: '20 ноя 2024', time: '14:30', type: 'Консультация кардиолога', status: 'completed', notes: 'ЭКГ в норме, продолжить наблюдение' },
    { date: '15 ноя 2024', time: '09:00', type: 'Анализ крови', status: 'completed', notes: 'Все показатели в пределах нормы' },
    { date: '10 ноя 2024', time: '16:00', type: 'Консультация эндокринолога', status: 'completed' }
  ];

  const prescriptions: Prescription[] = [
    {
      id: '1',
      medication: 'Аспирин (Ацетилсалициловая кислота)',
      dosage: '100 мг',
      frequency: '1 раз в день',
      duration: 'Постоянно',
      startDate: '01 окт 2024',
      status: 'active'
    },
    {
      id: '2',
      medication: 'Метформин',
      dosage: '500 мг',
      frequency: '2 раза в день',
      duration: '6 месяцев',
      startDate: '15 ноя 2024',
      status: 'active'
    },
    {
      id: '3',
      medication: 'Лизиноприл',
      dosage: '10 мг',
      frequency: '1 раз в день (вечером)',
      duration: 'Постоянно',
      startDate: '05 сен 2024',
      status: 'active'
    },
    {
      id: '4',
      medication: 'Витамин D3',
      dosage: '2000 МЕ',
      frequency: '1 раз в день',
      duration: '3 месяца',
      startDate: '01 ноя 2024',
      status: 'active'
    }
  ];

  const diagnoses: Diagnosis[] = [
    {
      id: '1',
      date: '15 ноя 2024',
      code: 'I10',
      description: 'Эссенциальная (первичная) гипертензия',
      severity: 'medium',
      status: 'active'
    },
    {
      id: '2',
      date: '10 окт 2024',
      code: 'E11',
      description: 'Сахарный диабет 2 типа',
      severity: 'medium',
      status: 'active'
    },
    {
      id: '3',
      date: '20 сен 2024',
      code: 'E03.9',
      description: 'Гипотиреоз неуточненный',
      severity: 'low',
      status: 'active'
    }
  ];

  const labResults = [
    {
      category: 'Общий анализ крови',
      date: '15 ноя 2024',
      results: [
        { name: 'Гемоглобин', value: '138', unit: 'г/л', norm: '120-150', status: 'normal' },
        { name: 'Эритроциты', value: '4.5', unit: '×10¹²/л', norm: '3.9-5.0', status: 'normal' },
        { name: 'Лейкоциты', value: '6.8', unit: '×10⁹/л', norm: '4.0-9.0', status: 'normal' },
        { name: 'Тромбоциты', value: '245', unit: '×10⁹/л', norm: '180-320', status: 'normal' }
      ]
    },
    {
      category: 'Биохимический анализ',
      date: '15 ноя 2024',
      results: [
        { name: 'Глюкоза', value: '5.8', unit: 'ммоль/л', norm: '3.9-6.1', status: 'normal' },
        { name: 'HbA1c', value: '6.2', unit: '%', norm: '<5.7', status: 'high' },
        { name: 'Холестерин общий', value: '5.4', unit: 'ммоль/л', norm: '<5.2', status: 'high' },
        { name: 'ТТГ', value: '3.2', unit: 'мМЕ/л', norm: '0.4-4.0', status: 'normal' },
        { name: 'Креатинин', value: '78', unit: 'мкмоль/л', norm: '62-106', status: 'normal' }
      ]
    }
  ];

  const vitalSigns = {
    lastUpdate: '23 ноя 2024, 18:45',
    data: [
      { name: 'Артериальное давление', value: '128/82', unit: 'мм рт.ст.', status: 'normal', icon: 'Heart' },
      { name: 'Пульс', value: '72', unit: 'уд/мин', status: 'normal', icon: 'Activity' },
      { name: 'Температура', value: '36.6', unit: '°C', status: 'normal', icon: 'Thermometer' },
      { name: 'SpO₂', value: '98', unit: '%', status: 'normal', icon: 'Wind' },
      { name: 'Вес', value: '62.5', unit: 'кг', status: 'normal', icon: 'Scale' },
      { name: 'ИМТ', value: '21.8', unit: 'кг/м²', status: 'normal', icon: 'User' }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-500';
      case 'high': return 'text-red-500';
      case 'low': return 'text-blue-500';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled': return <Badge variant="secondary">Запланирован</Badge>;
      case 'completed': return <Badge variant="default">Завершен</Badge>;
      case 'cancelled': return <Badge variant="destructive">Отменен</Badge>;
      case 'active': return <Badge variant="default">Активен</Badge>;
      case 'resolved': return <Badge variant="secondary">Разрешен</Badge>;
      default: return null;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high': return <Badge variant="destructive">Высокая</Badge>;
      case 'medium': return <Badge variant="secondary">Средняя</Badge>;
      case 'low': return <Badge variant="outline">Низкая</Badge>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Кабинет врача</h2>
          <p className="text-muted-foreground">
            Полная медицинская информация пациента Ким Джису
          </p>
        </div>
        <Badge variant="outline" className="gap-2">
          <Icon name="UserCheck" size={14} />
          Лечащий врач
        </Badge>
      </div>

      <PatientHeader />

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="overview" className="gap-1">
            <Icon name="LayoutDashboard" size={14} />
            <span className="hidden sm:inline">Обзор</span>
          </TabsTrigger>
          <TabsTrigger value="diagnoses" className="gap-1">
            <Icon name="FileText" size={14} />
            <span className="hidden sm:inline">Диагнозы</span>
          </TabsTrigger>
          <TabsTrigger value="prescriptions" className="gap-1">
            <Icon name="Pill" size={14} />
            <span className="hidden sm:inline">Назначения</span>
          </TabsTrigger>
          <TabsTrigger value="labs" className="gap-1">
            <Icon name="FlaskConical" size={14} />
            <span className="hidden sm:inline">Анализы</span>
          </TabsTrigger>
          <TabsTrigger value="appointments" className="gap-1">
            <Icon name="Calendar" size={14} />
            <span className="hidden sm:inline">Приемы</span>
          </TabsTrigger>
          <TabsTrigger value="notes" className="gap-1">
            <Icon name="FileEdit" size={14} />
            <span className="hidden sm:inline">Заметки</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <OverviewTab 
            vitalSigns={vitalSigns}
            diagnoses={diagnoses}
            prescriptions={prescriptions}
            getSeverityBadge={getSeverityBadge}
          />
        </TabsContent>

        <MedicalRecordsTab
          diagnoses={diagnoses}
          prescriptions={prescriptions}
          getStatusBadge={getStatusBadge}
          getSeverityBadge={getSeverityBadge}
        />

        <LabsAndNotesTab
          labResults={labResults}
          appointments={appointments}
          clinicalNote={clinicalNote}
          setClinicalNote={setClinicalNote}
          getStatusColor={getStatusColor}
          getStatusBadge={getStatusBadge}
        />
      </Tabs>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3 text-sm">
            <Icon name="Shield" size={20} className="text-primary mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <p className="font-medium">Конфиденциальность медицинских данных</p>
              <ul className="space-y-1 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Доступ к данным пациента имеют только авторизованные медицинские работники</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Все действия с медицинской картой логируются и подлежат аудиту</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Данные защищены в соответствии с требованиями защиты персональных данных</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorPanel;
