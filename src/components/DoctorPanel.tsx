import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

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

      <Card className="bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-background border-blue-500/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Icon name="User" size={32} className="text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Ким Джису (Kim Jisoo)</h3>
                <p className="text-sm text-muted-foreground">29 лет, Женщина</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline">ID: #12847</Badge>
                  <Badge variant="outline">Группа крови: A (II) Rh+</Badge>
                </div>
              </div>
            </div>
            <div className="text-right space-y-1">
              <p className="text-sm text-muted-foreground">Дата регистрации</p>
              <p className="font-medium">15 января 2020</p>
              <p className="text-sm text-muted-foreground">Последний визит: 20 ноя 2024</p>
            </div>
          </div>
        </CardContent>
      </Card>

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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Activity" size={20} />
                Жизненные показатели
              </CardTitle>
              <CardDescription>
                Последнее обновление: {vitalSigns.lastUpdate}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {vitalSigns.data.map((sign, idx) => (
                  <Card key={idx}>
                    <CardContent className="pt-6 space-y-2">
                      <div className="flex items-center justify-between">
                        <Icon name={sign.icon as any} className="text-primary" size={20} />
                        <Badge variant="outline">{sign.status === 'normal' ? 'Норма' : 'Отклонение'}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{sign.name}</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold">{sign.value}</span>
                        <span className="text-sm text-muted-foreground">{sign.unit}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="AlertTriangle" size={20} />
                  Активные диагнозы
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {diagnoses.filter(d => d.status === 'active').map((diagnosis) => (
                  <div key={diagnosis.id} className="flex items-start justify-between p-3 rounded-lg bg-secondary/20">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{diagnosis.code}</Badge>
                        {getSeverityBadge(diagnosis.severity)}
                      </div>
                      <p className="text-sm font-medium">{diagnosis.description}</p>
                      <p className="text-xs text-muted-foreground">Диагностирован: {diagnosis.date}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Pill" size={20} />
                  Текущие назначения
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {prescriptions.filter(p => p.status === 'active').slice(0, 3).map((prescription) => (
                  <div key={prescription.id} className="flex items-start justify-between p-3 rounded-lg bg-secondary/20">
                    <div className="space-y-1 flex-1">
                      <p className="text-sm font-medium">{prescription.medication}</p>
                      <p className="text-xs text-muted-foreground">
                        {prescription.dosage} — {prescription.frequency}
                      </p>
                    </div>
                    <Badge variant="default">Активен</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="diagnoses" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Диагнозы</CardTitle>
                  <CardDescription>История заболеваний пациента</CardDescription>
                </div>
                <Button>
                  <Icon name="Plus" size={16} />
                  Добавить диагноз
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {diagnoses.map((diagnosis) => (
                <Card key={diagnosis.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-semibold">{diagnosis.description}</h4>
                          {getStatusBadge(diagnosis.status)}
                          {getSeverityBadge(diagnosis.severity)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Icon name="Calendar" size={14} />
                            {diagnosis.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="FileText" size={14} />
                            МКБ-10: {diagnosis.code}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Icon name="Edit" size={14} />
                        Изменить
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prescriptions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Лекарственные назначения</CardTitle>
                  <CardDescription>Все рецепты и назначения</CardDescription>
                </div>
                <Button>
                  <Icon name="Plus" size={16} />
                  Новый рецепт
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {prescriptions.map((prescription) => (
                <Card key={prescription.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{prescription.medication}</h4>
                          {getStatusBadge(prescription.status)}
                        </div>
                        <div className="grid md:grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Дозировка:</span>
                            <span className="ml-2 font-medium">{prescription.dosage}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Частота:</span>
                            <span className="ml-2 font-medium">{prescription.frequency}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Длительность:</span>
                            <span className="ml-2 font-medium">{prescription.duration}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Начало приема:</span>
                            <span className="ml-2 font-medium">{prescription.startDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Icon name="Edit" size={14} />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Icon name="Printer" size={14} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="labs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="FlaskConical" size={20} />
                Результаты лабораторных исследований
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {labResults.map((lab, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{lab.category}</h4>
                    <Badge variant="outline">{lab.date}</Badge>
                  </div>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        {lab.results.map((result, rIdx) => (
                          <div key={rIdx} className="flex items-center justify-between py-2 border-b last:border-0">
                            <span className="text-sm">{result.name}</span>
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-muted-foreground">{result.norm}</span>
                              <span className={`font-semibold ${getStatusColor(result.status)}`}>
                                {result.value} {result.unit}
                              </span>
                              {result.status === 'normal' ? (
                                <Icon name="CheckCircle2" className="text-green-500" size={16} />
                              ) : (
                                <Icon name="AlertCircle" className="text-red-500" size={16} />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  {idx < labResults.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>История приемов</CardTitle>
                  <CardDescription>Запланированные и прошедшие визиты</CardDescription>
                </div>
                <Button>
                  <Icon name="Plus" size={16} />
                  Записать на прием
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {appointments.map((appointment, idx) => (
                <Card key={idx}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{appointment.type}</h4>
                          {getStatusBadge(appointment.status)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Icon name="Calendar" size={14} />
                            {appointment.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="Clock" size={14} />
                            {appointment.time}
                          </div>
                        </div>
                        {appointment.notes && (
                          <p className="text-sm bg-secondary/20 p-2 rounded">
                            <span className="font-medium">Заметки: </span>
                            {appointment.notes}
                          </p>
                        )}
                      </div>
                      {appointment.status === 'scheduled' && (
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Icon name="Edit" size={14} />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Icon name="X" size={14} />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="FileEdit" size={20} />
                Клинические заметки
              </CardTitle>
              <CardDescription>
                Создание записей о состоянии пациента и назначениях
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label>Новая заметка</Label>
                <Textarea 
                  placeholder="Введите клиническую заметку..."
                  value={clinicalNote}
                  onChange={(e) => setClinicalNote(e.target.value)}
                  className="min-h-[200px]"
                />
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Дата</Label>
                    <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                  </div>
                  <div className="space-y-2">
                    <Label>Тип записи</Label>
                    <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                      <option>Осмотр</option>
                      <option>Консультация</option>
                      <option>Наблюдение</option>
                      <option>Процедура</option>
                    </select>
                  </div>
                </div>
                <Button>
                  <Icon name="Save" size={16} />
                  Сохранить заметку
                </Button>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-semibold">История заметок</h4>
                <Card>
                  <CardContent className="pt-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">20 ноя 2024</Badge>
                          <Badge variant="secondary">Консультация</Badge>
                        </div>
                        <p className="text-sm">
                          Проведена консультация кардиолога. ЭКГ показывает нормальный синусовый ритм. 
                          Артериальное давление в пределах нормы. Рекомендовано продолжить прием препаратов 
                          и явиться на повторный прием через 1 месяц.
                        </p>
                        <p className="text-xs text-muted-foreground">Врач: Иванов И.И.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">15 ноя 2024</Badge>
                          <Badge variant="secondary">Осмотр</Badge>
                        </div>
                        <p className="text-sm">
                          Плановый осмотр. Общее состояние удовлетворительное. 
                          Жалобы на периодическую головную боль. Назначены анализы крови и мониторинг АД.
                        </p>
                        <p className="text-xs text-muted-foreground">Врач: Петров П.П.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
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
