import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const ProfileTab = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="User" size={24} />
            Личная информация
          </CardTitle>
          <CardDescription>Управление вашим профилем</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="bg-primary text-white text-2xl">КД</AvatarFallback>
            </Avatar>
            <Button variant="outline">Изменить фото</Button>
          </div>

          <Separator />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input id="name" defaultValue="Ким Джису" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Возраст</Label>
              <Input id="age" type="number" defaultValue="29" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="occupation" className="flex items-center gap-2">
                <Icon name="Briefcase" size={16} />
                Место работы
              </Label>
              <Input id="occupation" placeholder="Должность, организация" defaultValue="Певица, актриса, YG Entertainment" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input id="phone" type="tel" defaultValue="+82 10-1234-5678" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="blood">Группа крови</Label>
              <Input id="blood" defaultValue="A (II) Rh+" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Рост (см)</Label>
              <Input id="height" type="number" defaultValue="162" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Вес (кг)</Label>
              <Input id="weight" type="number" defaultValue="45" />
            </div>
          </div>

          <Button className="w-full md:w-auto">
            <Icon name="Save" size={16} />
            Сохранить изменения
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="AlertCircle" size={24} />
            Медицинские данные
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="allergies">Аллергии</Label>
            <Input id="allergies" placeholder="Пенициллин, арахис..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="chronic">Хронические заболевания</Label>
            <Input id="chronic" placeholder="Гипертония, диабет..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="emergency">Контакт на случай экстренной ситуации</Label>
            <Input id="emergency" placeholder="+7 (999) 000-00-00" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Settings" size={24} />
            Настройки
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Уведомления о лекарствах</h4>
              <p className="text-sm text-muted-foreground">Напоминания о приеме препаратов</p>
            </div>
            <Button variant="outline" size="sm">Включено</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Экспорт данных</h4>
              <p className="text-sm text-muted-foreground">Скачать всю медицинскую историю</p>
            </div>
            <Button variant="outline" size="sm">
              <Icon name="Download" size={16} />
              Скачать
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileTab;