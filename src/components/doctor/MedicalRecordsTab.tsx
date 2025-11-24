import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';
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

interface MedicalRecordsTabProps {
  diagnoses: Diagnosis[];
  prescriptions: Prescription[];
  getStatusBadge: (status: string) => JSX.Element | null;
  getSeverityBadge: (severity: string) => JSX.Element | null;
}

const MedicalRecordsTab = ({ diagnoses, prescriptions, getStatusBadge, getSeverityBadge }: MedicalRecordsTabProps) => {
  return (
    <>
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
    </>
  );
};

export default MedicalRecordsTab;
