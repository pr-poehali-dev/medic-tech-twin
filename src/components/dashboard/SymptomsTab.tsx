import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Symptom {
  date: string;
  mood: number;
  energy: number;
  sleep: number;
}

interface SymptomsTabProps {
  symptoms: Symptom[];
}

const SymptomsTab = ({ symptoms }: SymptomsTabProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Activity" size={24} />
            Отслеживание симптомов
          </CardTitle>
          <CardDescription>Мониторинг вашего самочувствия</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {symptoms.map((symptom, idx) => (
              <div key={idx} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{symptom.date}</span>
                  <Badge variant="outline">Записано</Badge>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Icon name="Smile" size={16} className="text-primary" />
                      <span className="text-xs text-muted-foreground">Настроение</span>
                    </div>
                    <div className="text-2xl font-bold">{symptom.mood}%</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Icon name="Zap" size={16} className="text-primary" />
                      <span className="text-xs text-muted-foreground">Энергия</span>
                    </div>
                    <div className="text-2xl font-bold">{symptom.energy}%</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Icon name="Moon" size={16} className="text-primary" />
                      <span className="text-xs text-muted-foreground">Сон</span>
                    </div>
                    <div className="text-2xl font-bold">{symptom.sleep}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SymptomsTab;
