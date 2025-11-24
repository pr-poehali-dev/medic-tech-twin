import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Diagnosis {
  id: string;
  date: string;
  code: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  status: 'active' | 'resolved';
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

interface OverviewTabProps {
  vitalSigns: {
    lastUpdate: string;
    data: Array<{
      name: string;
      value: string;
      unit: string;
      status: string;
      icon: string;
    }>;
  };
  diagnoses: Diagnosis[];
  prescriptions: Prescription[];
  getSeverityBadge: (severity: string) => JSX.Element | null;
}

const OverviewTab = ({ vitalSigns, diagnoses, prescriptions, getSeverityBadge }: OverviewTabProps) => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default OverviewTab;
