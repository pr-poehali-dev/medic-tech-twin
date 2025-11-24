import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Checkup {
  age: string;
  period: string;
  examinations: string[];
  specialists: string[];
  completed: boolean;
  nextDate?: string;
}

interface CheckupTabProps {
  checkupSchedule: Checkup[];
  currentAge: number;
}

const CheckupTab = ({ checkupSchedule, currentAge }: CheckupTabProps) => {
  const isCurrentAgeGroup = (age: string) => {
    if (age === '18-39 лет') return currentAge >= 18 && currentAge <= 39;
    if (age === '40-64 лет') return currentAge >= 40 && currentAge <= 64;
    if (age === '65+ лет') return currentAge >= 65;
    return false;
  };

  return (
    <div className="space-y-4">
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={20} className="text-primary mt-0.5" />
            <div className="text-sm space-y-1">
              <p className="font-medium">Программа диспансеризации</p>
              <p className="text-muted-foreground">
                Текущий возраст пациента: <span className="font-medium text-foreground">{currentAge} лет</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {checkupSchedule.map((checkup, idx) => (
        <Card key={idx} className={isCurrentAgeGroup(checkup.age) ? 'border-primary shadow-sm' : ''}>
          <CardHeader>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2 flex-wrap">
                  <Icon name="Calendar" size={20} />
                  {checkup.age}
                  {isCurrentAgeGroup(checkup.age) && (
                    <Badge variant="default">Текущая группа</Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  Периодичность: {checkup.period}
                </CardDescription>
              </div>
              {checkup.completed && checkup.nextDate && (
                <Badge variant="outline" className="gap-1.5">
                  <Icon name="CalendarClock" size={14} />
                  Следующий осмотр: {new Date(checkup.nextDate).toLocaleDateString('ru-RU')}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                <Icon name="Clipboard" size={16} />
                Обследования
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {checkup.examinations.map((exam, eIdx) => (
                  <div key={eIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-1">•</span>
                    <span>{exam}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                <Icon name="Users" size={16} />
                Консультации специалистов
              </h4>
              <div className="flex flex-wrap gap-2">
                {checkup.specialists.map((specialist, sIdx) => (
                  <Badge key={sIdx} variant="secondary">
                    {specialist}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CheckupTab;
