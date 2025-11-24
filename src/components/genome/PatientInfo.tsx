import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface PatientInfoProps {
  patientInfo: {
    name: string;
    age: number;
    sex: string;
    ethnicity: string;
    bloodType: string;
    sequencingDate: string;
    coverage: string;
    variants: number;
  };
}

const PatientInfo = ({ patientInfo }: PatientInfoProps) => {
  return (
    <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Dna" size={24} />
          Информация о пациенте
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">ФИО</p>
            <p className="font-medium">{patientInfo.name}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Возраст</p>
            <p className="font-medium">{patientInfo.age} лет</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Пол</p>
            <p className="font-medium">{patientInfo.sex}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Этническая принадлежность</p>
            <p className="font-medium">{patientInfo.ethnicity}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Группа крови</p>
            <p className="font-medium">{patientInfo.bloodType}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Дата секвенирования</p>
            <p className="font-medium">{patientInfo.sequencingDate}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Покрытие</p>
            <p className="font-medium">{patientInfo.coverage}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Выявлено вариантов</p>
            <p className="font-medium">{patientInfo.variants.toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientInfo;
