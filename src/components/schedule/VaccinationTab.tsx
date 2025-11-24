import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Vaccination {
  vaccine: string;
  age: string;
  doses: number;
  description: string;
  completed: boolean;
  nextDate?: string;
  isRecommended: boolean;
}

interface AgeBasedVaccination {
  ageGroup: string;
  vaccines: string[];
  isCurrentAge: boolean;
}

interface VaccinationTabProps {
  vaccinationSchedule: Vaccination[];
  ageBasedVaccinations: AgeBasedVaccination[];
}

const VaccinationTab = ({ vaccinationSchedule, ageBasedVaccinations }: VaccinationTabProps) => {
  const recommendedVaccines = vaccinationSchedule.filter(v => v.isRecommended);
  const otherVaccines = vaccinationSchedule.filter(v => !v.isRecommended);

  return (
    <div className="space-y-6">
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={20} className="text-primary mt-0.5" />
            <div className="text-sm space-y-1">
              <p className="font-medium">Календарь вакцинации взрослых</p>
              <p className="text-muted-foreground">
                Рекомендуемые прививки в зависимости от возраста и состояния здоровья.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Icon name="ShieldCheck" size={20} />
          Обязательные и рекомендованные прививки
        </h3>
        <div className="space-y-3">
          {recommendedVaccines.map((vaccine, idx) => (
            <Card key={idx} className="border-primary/30">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex items-start gap-3 flex-1">
                    <Icon name="Syringe" size={20} className="text-primary mt-1" />
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-semibold">{vaccine.vaccine}</h4>
                        {vaccine.completed && <Badge variant="default">Выполнено</Badge>}
                        <Badge variant="outline">{vaccine.age}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{vaccine.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="Layers" size={12} />
                          Доз: {vaccine.doses}
                        </span>
                        {vaccine.nextDate && (
                          <span className="flex items-center gap-1 text-primary">
                            <Icon name="CalendarClock" size={12} />
                            Следующая: {new Date(vaccine.nextDate).toLocaleDateString('ru-RU')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Icon name="Stethoscope" size={20} />
          Дополнительные прививки по показаниям
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {otherVaccines.map((vaccine, idx) => (
            <Card key={idx} className="bg-secondary/20">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Icon name="Syringe" size={16} className="text-muted-foreground mt-1" />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-medium text-sm">{vaccine.vaccine}</h4>
                        {vaccine.completed && <Badge variant="outline" className="text-xs">Выполнено</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground">{vaccine.age} • {vaccine.doses} дозы</p>
                      <p className="text-xs text-muted-foreground">{vaccine.description}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Icon name="Users" size={20} />
          График вакцинации по возрастным группам
        </h3>
        <div className="space-y-3">
          {ageBasedVaccinations.map((group, idx) => (
            <Card key={idx} className={group.isCurrentAge ? 'border-primary' : ''}>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-medium">{group.ageGroup}</h4>
                    {group.isCurrentAge && (
                      <Badge variant="default">Ваша группа</Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.vaccines.map((vaccine, vIdx) => (
                      <Badge key={vIdx} variant="secondary" className="text-xs">
                        {vaccine}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VaccinationTab;
