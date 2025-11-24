import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface ChromosomeData {
  number: string;
  size: string;
  genes: number;
  variants: number;
}

interface ChromosomeMapProps {
  chromosomes: ChromosomeData[];
}

const ChromosomeMap = ({ chromosomes }: ChromosomeMapProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Layers" size={24} />
          Карта хромосом
        </CardTitle>
        <CardDescription>
          Распределение генов и вариантов по хромосомам
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {chromosomes.map((chr) => (
            <Card key={chr.number} className={chr.number === 'Y' ? 'opacity-50' : ''}>
              <CardContent className="pt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">Chr {chr.number}</span>
                  {chr.number === 'Y' && <Badge variant="outline" className="text-xs">N/A</Badge>}
                </div>
                {chr.number !== 'Y' && (
                  <>
                    <p className="text-xs text-muted-foreground">{chr.size}</p>
                    <Separator />
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Гены:</span>
                        <span className="font-medium">{chr.genes}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Варианты:</span>
                        <span className="font-medium">{chr.variants.toLocaleString()}</span>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChromosomeMap;
