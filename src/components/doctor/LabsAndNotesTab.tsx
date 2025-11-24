import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { TabsContent } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Appointment {
  date: string;
  time: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

interface LabsAndNotesTabProps {
  labResults: Array<{
    category: string;
    date: string;
    results: Array<{
      name: string;
      value: string;
      unit: string;
      norm: string;
      status: string;
    }>;
  }>;
  appointments: Appointment[];
  clinicalNote: string;
  setClinicalNote: (note: string) => void;
  getStatusColor: (status: string) => string;
  getStatusBadge: (status: string) => JSX.Element | null;
}

const LabsAndNotesTab = ({ 
  labResults, 
  appointments, 
  clinicalNote, 
  setClinicalNote, 
  getStatusColor, 
  getStatusBadge 
}: LabsAndNotesTabProps) => {
  return (
    <>
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
    </>
  );
};

export default LabsAndNotesTab;
