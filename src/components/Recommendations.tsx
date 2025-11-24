import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';

interface Recommendation {
  id: string;
  specialist: string;
  specialistType: string;
  date: string;
  title: string;
  description: string;
  reminder: boolean;
  reminderTime?: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([
    {
      id: '1',
      specialist: 'Доктор Иванов А.П.',
      specialistType: 'Кардиолог',
      date: '2024-11-20',
      title: 'Контроль артериального давления',
      description: 'Измерять давление утром и вечером, записывать в дневник. При показателях выше 140/90 связаться с врачом.',
      reminder: true,
      reminderTime: '09:00',
      completed: false,
      priority: 'high'
    },
    {
      id: '2',
      specialist: 'Доктор Петрова Е.С.',
      specialistType: 'Эндокринолог',
      date: '2024-11-18',
      title: 'Контроль уровня глюкозы',
      description: 'Проверять уровень сахара в крови натощак 3 раза в неделю. Поддерживать показатели в пределах 4.0-6.0 ммоль/л.',
      reminder: true,
      reminderTime: '08:00',
      completed: false,
      priority: 'high'
    },
    {
      id: '3',
      specialist: 'Доктор Сидоров М.В.',
      specialistType: 'Терапевт',
      date: '2024-11-15',
      title: 'Физическая активность',
      description: 'Ежедневная ходьба не менее 30 минут в умеренном темпе. Избегать интенсивных нагрузок.',
      reminder: true,
      reminderTime: '18:00',
      completed: false,
      priority: 'medium'
    },
    {
      id: '4',
      specialist: 'Диетолог Смирнова О.И.',
      specialistType: 'Диетолог',
      date: '2024-11-10',
      title: 'Диетические рекомендации',
      description: 'Ограничить соль до 5г в день, увеличить потребление овощей и фруктов. Исключить жареное и копченое.',
      reminder: false,
      completed: true,
      priority: 'medium'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newRecommendation, setNewRecommendation] = useState({
    specialist: '',
    specialistType: '',
    title: '',
    description: '',
    reminder: false,
    reminderTime: '',
    priority: 'medium' as 'high' | 'medium' | 'low'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newRecommendation.specialist || !newRecommendation.title) {
      return;
    }

    const recommendation: Recommendation = {
      id: Date.now().toString(),
      specialist: newRecommendation.specialist,
      specialistType: newRecommendation.specialistType,
      date: new Date().toISOString().split('T')[0],
      title: newRecommendation.title,
      description: newRecommendation.description,
      reminder: newRecommendation.reminder,
      reminderTime: newRecommendation.reminderTime,
      completed: false,
      priority: newRecommendation.priority
    };

    setRecommendations([recommendation, ...recommendations]);
    setNewRecommendation({
      specialist: '',
      specialistType: '',
      title: '',
      description: '',
      reminder: false,
      reminderTime: '',
      priority: 'medium'
    });
    setShowForm(false);
  };

  const toggleCompleted = (id: string) => {
    setRecommendations(recommendations.map(rec => 
      rec.id === id ? { ...rec, completed: !rec.completed } : rec
    ));
  };

  const toggleReminder = (id: string) => {
    setRecommendations(recommendations.map(rec => 
      rec.id === id ? { ...rec, reminder: !rec.reminder } : rec
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Высокий';
      case 'medium': return 'Средний';
      case 'low': return 'Низкий';
      default: return 'Средний';
    }
  };

  const getSpecialistIcon = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('кардио')) return 'Heart';
    if (lowerType.includes('эндокрино')) return 'Activity';
    if (lowerType.includes('терапевт')) return 'Stethoscope';
    if (lowerType.includes('диетолог')) return 'UtensilsCrossed';
    if (lowerType.includes('невролог')) return 'Brain';
    return 'UserCircle';
  };

  const activeRecommendations = recommendations.filter(r => !r.completed);
  const completedRecommendations = recommendations.filter(r => r.completed);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Рекомендации специалистов</h2>
          <p className="text-muted-foreground">Следите за назначениями врачей</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Icon name={showForm ? "X" : "Plus"} size={16} />
          {showForm ? 'Отмена' : 'Добавить'}
        </Button>
      </div>

      {showForm && (
        <Card className="border-primary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="ClipboardPlus" size={24} />
              Новая рекомендация
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="specialist">Специалист *</Label>
                  <Input
                    id="specialist"
                    placeholder="Имя врача"
                    value={newRecommendation.specialist}
                    onChange={(e) => setNewRecommendation({ ...newRecommendation, specialist: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialistType">Специализация</Label>
                  <Input
                    id="specialistType"
                    placeholder="Кардиолог, Терапевт..."
                    value={newRecommendation.specialistType}
                    onChange={(e) => setNewRecommendation({ ...newRecommendation, specialistType: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Название рекомендации *</Label>
                <Input
                  id="title"
                  placeholder="Краткое название"
                  value={newRecommendation.title}
                  onChange={(e) => setNewRecommendation({ ...newRecommendation, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  placeholder="Подробное описание рекомендации"
                  value={newRecommendation.description}
                  onChange={(e) => setNewRecommendation({ ...newRecommendation, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Приоритет</Label>
                  <select
                    id="priority"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={newRecommendation.priority}
                    onChange={(e) => setNewRecommendation({ ...newRecommendation, priority: e.target.value as any })}
                  >
                    <option value="low">Низкий</option>
                    <option value="medium">Средний</option>
                    <option value="high">Высокий</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reminderTime">Время напоминания</Label>
                  <Input
                    id="reminderTime"
                    type="time"
                    value={newRecommendation.reminderTime}
                    onChange={(e) => setNewRecommendation({ ...newRecommendation, reminderTime: e.target.value })}
                    disabled={!newRecommendation.reminder}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="reminder"
                  checked={newRecommendation.reminder}
                  onCheckedChange={(checked) => setNewRecommendation({ ...newRecommendation, reminder: checked })}
                />
                <Label htmlFor="reminder" className="cursor-pointer">
                  Включить напоминание
                </Label>
              </div>

              <Button type="submit" className="w-full">
                <Icon name="Save" size={16} />
                Сохранить рекомендацию
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Icon name="ListTodo" size={20} />
          <h3 className="text-lg font-semibold">Активные рекомендации</h3>
          <Badge variant="secondary">{activeRecommendations.length}</Badge>
        </div>

        {activeRecommendations.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8 text-muted-foreground">
              <Icon name="CheckCircle2" size={48} className="mx-auto mb-2 opacity-20" />
              <p>Все рекомендации выполнены!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {activeRecommendations.map((rec) => (
              <Card key={rec.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="mt-1">
                          <Icon name={getSpecialistIcon(rec.specialistType)} size={20} className="text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-semibold">{rec.title}</h4>
                            <Badge variant={getPriorityColor(rec.priority) as any}>
                              {getPriorityLabel(rec.priority)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {rec.specialist} • {rec.specialistType}
                          </p>
                          {rec.description && (
                            <p className="text-sm mt-2">{rec.description}</p>
                          )}
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                            <span className="flex items-center gap-1">
                              <Icon name="Calendar" size={12} />
                              {new Date(rec.date).toLocaleDateString('ru-RU')}
                            </span>
                            {rec.reminder && rec.reminderTime && (
                              <span className="flex items-center gap-1 text-primary">
                                <Icon name="Bell" size={12} />
                                Напоминание в {rec.reminderTime}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleReminder(rec.id)}
                          className={rec.reminder ? 'text-primary' : 'text-muted-foreground'}
                        >
                          <Icon name="Bell" size={18} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleCompleted(rec.id)}
                        >
                          <Icon name="Check" size={18} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {completedRecommendations.length > 0 && (
        <div className="space-y-4">
          <Separator />
          <div className="flex items-center gap-2">
            <Icon name="CheckCircle2" size={20} className="text-muted-foreground" />
            <h3 className="text-lg font-semibold text-muted-foreground">Выполненные</h3>
            <Badge variant="outline">{completedRecommendations.length}</Badge>
          </div>

          <div className="space-y-3">
            {completedRecommendations.map((rec) => (
              <Card key={rec.id} className="opacity-60">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="mt-1">
                        <Icon name={getSpecialistIcon(rec.specialistType)} size={20} className="text-muted-foreground" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h4 className="font-semibold line-through">{rec.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {rec.specialist} • {rec.specialistType}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleCompleted(rec.id)}
                    >
                      <Icon name="RotateCcw" size={18} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Recommendations;
