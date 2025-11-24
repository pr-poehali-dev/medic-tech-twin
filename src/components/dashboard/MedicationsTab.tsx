import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Medication {
  name: string;
  dosage: string;
  time: string;
  taken: boolean;
}

interface MedicationsTabProps {
  medications: Medication[];
}

const MedicationsTab = ({ medications }: MedicationsTabProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Pill" size={24} />
            Расписание приема лекарств
          </CardTitle>
          <CardDescription>Отслеживайте прием ваших медикаментов</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {medications.map((med, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${med.taken ? 'bg-secondary/20' : 'bg-primary/10'}`}>
                  <Icon name={med.taken ? "CheckCircle2" : "Clock"} size={24} className={med.taken ? 'text-secondary' : 'text-primary'} />
                </div>
                <div>
                  <h3 className="font-semibold">{med.name}</h3>
                  <p className="text-sm text-muted-foreground">{med.dosage} в {med.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {med.taken ? (
                  <Badge variant="secondary">Принято</Badge>
                ) : (
                  <Button size="sm">Отметить</Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="History" size={24} />
            История приема
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Сегодня</span>
              <span className="font-medium">2 из 3 принято</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Вчера</span>
              <span className="font-medium text-secondary">3 из 3 принято</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Позавчера</span>
              <span className="font-medium text-secondary">3 из 3 принято</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicationsTab;
