import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  age?: number;
  deceased?: boolean;
  diseases: {
    name: string;
    ageOnset: number;
    status: 'active' | 'controlled' | 'resolved';
  }[];
  position: { x: number; y: number };
  generation: number;
}

interface FamilyTreeViewProps {
  familyTree: FamilyMember[];
}

const FamilyTreeView = ({ familyTree }: FamilyTreeViewProps) => {
  return (
    <Card className="bg-gradient-to-br from-primary/5 to-background">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="GitBranch" size={20} />
          Семейное древо заболеваний
        </CardTitle>
        <CardDescription>
          Визуализация наследственных заболеваний в семье
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {[0, 1, 2].map((generation) => {
            const members = familyTree.filter(m => m.generation === generation);
            const generationLabel = generation === 0 ? 'Бабушки и дедушки' : generation === 1 ? 'Родители' : 'Пациент';
            
            return (
              <div key={generation} className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    Поколение {generation + 1}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{generationLabel}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {members.map((member) => (
                    <Card 
                      key={member.id} 
                      className={`${member.id === 'patient' ? 'border-primary border-2' : ''} ${member.deceased ? 'opacity-60' : ''}`}
                    >
                      <CardContent className="pt-4 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Icon 
                              name={member.id === 'patient' ? 'UserCircle' : 'User'} 
                              size={20} 
                              className={member.id === 'patient' ? 'text-primary' : 'text-muted-foreground'}
                            />
                            <div>
                              <h5 className="font-medium text-sm">{member.name}</h5>
                              <p className="text-xs text-muted-foreground">{member.relation}</p>
                            </div>
                          </div>
                          {member.deceased && (
                            <Badge variant="secondary" className="text-xs">✝</Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Icon name="Calendar" size={12} />
                          <span>{member.age} {member.deceased ? 'лет (умер)' : 'лет'}</span>
                        </div>

                        {member.diseases.length > 0 ? (
                          <div className="space-y-2">
                            <Separator />
                            <div className="space-y-1.5">
                              {member.diseases.map((disease, idx) => (
                                <div key={idx} className="space-y-1">
                                  <div className="flex items-start gap-2">
                                    <Icon 
                                      name={
                                        disease.status === 'resolved' ? 'CheckCircle2' : 
                                        disease.status === 'controlled' ? 'ShieldCheck' : 
                                        'AlertCircle'
                                      } 
                                      size={14} 
                                      className={
                                        disease.status === 'resolved' ? 'text-green-500 mt-0.5' : 
                                        disease.status === 'controlled' ? 'text-blue-500 mt-0.5' : 
                                        'text-destructive mt-0.5'
                                      }
                                    />
                                    <div className="flex-1">
                                      <p className="text-xs font-medium">{disease.name}</p>
                                      <p className="text-xs text-muted-foreground">
                                        В {disease.ageOnset} лет
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="text-xs text-muted-foreground italic pt-2 border-t">
                            Нет известных заболеваний
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <Separator className="my-6" />

        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Icon name="Info" size={16} />
            Легенда статусов заболеваний
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-center gap-2 text-sm">
              <Icon name="AlertCircle" size={16} className="text-destructive" />
              <span className="text-muted-foreground">Активное заболевание</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Icon name="ShieldCheck" size={16} className="text-blue-500" />
              <span className="text-muted-foreground">Под контролем</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Icon name="CheckCircle2" size={16} className="text-green-500" />
              <span className="text-muted-foreground">Вылечено</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FamilyTreeView;
