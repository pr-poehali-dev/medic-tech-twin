import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface LifestyleEntry {
  id: string;
  date: string;
  sleep: string;
  water: string;
  steps: string;
  exercise: string;
  meals: string;
  notes: string;
}

const Lifestyle = () => {
  const [entries, setEntries] = useState<LifestyleEntry[]>([
    {
      id: '1',
      date: '2024-11-24',
      sleep: '7.5',
      water: '6',
      steps: '8500',
      exercise: '30',
      meals: '3',
      notes: 'Утренняя пробежка, чувствую себя хорошо'
    }
  ]);

  const [newEntry, setNewEntry] = useState({
    sleep: '',
    water: '',
    steps: '',
    exercise: '',
    meals: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const now = new Date();
    const entry: LifestyleEntry = {
      id: Date.now().toString(),
      date: now.toISOString().split('T')[0],
      sleep: newEntry.sleep,
      water: newEntry.water,
      steps: newEntry.steps,
      exercise: newEntry.exercise,
      meals: newEntry.meals,
      notes: newEntry.notes
    };

    setEntries([entry, ...entries]);
    setNewEntry({ sleep: '', water: '', steps: '', exercise: '', meals: '', notes: '' });
  };

  const getSleepStatus = (hours: string) => {
    const h = parseFloat(hours);
    if (!h) return null;
    if (h < 6) return { label: 'Мало', variant: 'destructive' as const, progress: (h / 8) * 100 };
    if (h > 9) return { label: 'Много', variant: 'secondary' as const, progress: 100 };
    return { label: 'Норма', variant: 'default' as const, progress: (h / 8) * 100 };
  };

  const getWaterStatus = (glasses: string) => {
    const g = parseInt(glasses);
    if (!g) return null;
    if (g < 6) return { label: 'Мало', variant: 'secondary' as const, progress: (g / 8) * 100 };
    return { label: 'Хорошо', variant: 'default' as const, progress: Math.min((g / 8) * 100, 100) };
  };

  const getStepsStatus = (steps: string) => {
    const s = parseInt(steps);
    if (!s) return null;
    if (s < 5000) return { label: 'Мало', variant: 'secondary' as const, progress: (s / 10000) * 100 };
    if (s >= 10000) return { label: 'Отлично', variant: 'default' as const, progress: 100 };
    return { label: 'Хорошо', variant: 'default' as const, progress: (s / 10000) * 100 };
  };

  const todayEntry = entries[0];
  const sleepStatus = todayEntry?.sleep ? getSleepStatus(todayEntry.sleep) : null;
  const waterStatus = todayEntry?.water ? getWaterStatus(todayEntry.water) : null;
  const stepsStatus = todayEntry?.steps ? getStepsStatus(todayEntry.steps) : null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Icon name="Moon" size={18} />
              Сон
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{todayEntry?.sleep || '0'}</span>
                <span className="text-sm text-muted-foreground">часов</span>
              </div>
              {sleepStatus && (
                <>
                  <Progress value={sleepStatus.progress} className="h-2" />
                  <Badge variant={sleepStatus.variant} className="text-xs">
                    {sleepStatus.label}
                  </Badge>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Icon name="Droplet" size={18} />
              Вода
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{todayEntry?.water || '0'}</span>
                <span className="text-sm text-muted-foreground">стаканов</span>
              </div>
              {waterStatus && (
                <>
                  <Progress value={waterStatus.progress} className="h-2" />
                  <Badge variant={waterStatus.variant} className="text-xs">
                    {waterStatus.label}
                  </Badge>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Icon name="Footprints" size={18} />
              Шаги
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{todayEntry?.steps || '0'}</span>
                <span className="text-sm text-muted-foreground">шагов</span>
              </div>
              {stepsStatus && (
                <>
                  <Progress value={stepsStatus.progress} className="h-2" />
                  <Badge variant={stepsStatus.variant} className="text-xs">
                    {stepsStatus.label}
                  </Badge>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="ClipboardPlus" size={24} />
            Добавить запись за день
          </CardTitle>
          <CardDescription>
            Отметьте свою активность, питание и самочувствие
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sleep" className="flex items-center gap-2">
                  <Icon name="Moon" size={16} />
                  Сон (часов)
                </Label>
                <Input
                  id="sleep"
                  type="number"
                  step="0.5"
                  min="0"
                  max="24"
                  placeholder="8"
                  value={newEntry.sleep}
                  onChange={(e) => setNewEntry({ ...newEntry, sleep: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="water" className="flex items-center gap-2">
                  <Icon name="Droplet" size={16} />
                  Вода (стаканов)
                </Label>
                <Input
                  id="water"
                  type="number"
                  min="0"
                  max="20"
                  placeholder="8"
                  value={newEntry.water}
                  onChange={(e) => setNewEntry({ ...newEntry, water: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="steps" className="flex items-center gap-2">
                  <Icon name="Footprints" size={16} />
                  Шаги
                </Label>
                <Input
                  id="steps"
                  type="number"
                  min="0"
                  placeholder="10000"
                  value={newEntry.steps}
                  onChange={(e) => setNewEntry({ ...newEntry, steps: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="exercise" className="flex items-center gap-2">
                  <Icon name="Dumbbell" size={16} />
                  Физические нагрузки (мин)
                </Label>
                <Input
                  id="exercise"
                  type="number"
                  min="0"
                  placeholder="30"
                  value={newEntry.exercise}
                  onChange={(e) => setNewEntry({ ...newEntry, exercise: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meals" className="flex items-center gap-2">
                  <Icon name="UtensilsCrossed" size={16} />
                  Приемов пищи
                </Label>
                <Input
                  id="meals"
                  type="number"
                  min="0"
                  max="10"
                  placeholder="3"
                  value={newEntry.meals}
                  onChange={(e) => setNewEntry({ ...newEntry, meals: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="flex items-center gap-2">
                <Icon name="StickyNote" size={16} />
                Заметки о самочувствии
              </Label>
              <Textarea
                id="notes"
                placeholder="Как вы себя чувствуете? Что особенного произошло сегодня?"
                value={newEntry.notes}
                onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                rows={3}
              />
            </div>

            <Button type="submit" className="w-full md:w-auto">
              <Icon name="Plus" size={16} />
              Сохранить запись
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Calendar" size={24} />
            История записей
          </CardTitle>
        </CardHeader>
        <CardContent>
          {entries.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="FileText" size={48} className="mx-auto mb-2 opacity-20" />
              <p>Записей пока нет</p>
            </div>
          ) : (
            <div className="space-y-4">
              {entries.map((entry) => (
                <Card key={entry.id} className="bg-secondary/30">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {new Date(entry.date).toLocaleDateString('ru-RU', { 
                            day: 'numeric', 
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {entry.sleep && (
                          <div className="flex flex-col gap-1">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Icon name="Moon" size={12} />
                              Сон
                            </span>
                            <span className="text-sm font-medium">{entry.sleep} ч</span>
                          </div>
                        )}

                        {entry.water && (
                          <div className="flex flex-col gap-1">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Icon name="Droplet" size={12} />
                              Вода
                            </span>
                            <span className="text-sm font-medium">{entry.water} ст</span>
                          </div>
                        )}

                        {entry.steps && (
                          <div className="flex flex-col gap-1">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Icon name="Footprints" size={12} />
                              Шаги
                            </span>
                            <span className="text-sm font-medium">{entry.steps}</span>
                          </div>
                        )}

                        {entry.exercise && (
                          <div className="flex flex-col gap-1">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Icon name="Dumbbell" size={12} />
                              Упражнения
                            </span>
                            <span className="text-sm font-medium">{entry.exercise} мин</span>
                          </div>
                        )}

                        {entry.meals && (
                          <div className="flex flex-col gap-1">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Icon name="UtensilsCrossed" size={12} />
                              Питание
                            </span>
                            <span className="text-sm font-medium">{entry.meals} раз</span>
                          </div>
                        )}
                      </div>

                      {entry.notes && (
                        <div className="pt-2 border-t">
                          <p className="text-sm text-muted-foreground">{entry.notes}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Lifestyle;
