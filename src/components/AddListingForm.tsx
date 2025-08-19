import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface AddListingFormProps {
  newListing: {
    number: string;
    region: string;
    price: string;
    seller: string;
    phone: string;
    description: string;
  };
  setNewListing: (listing: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const AddListingForm: React.FC<AddListingFormProps> = ({
  newListing,
  setNewListing,
  onSubmit,
}) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="font-inter text-3xl font-bold text-gray-900 mb-2">
          Добавить объявление
        </h2>
        <p className="font-opensans text-gray-600">
          Разместите информацию о продаже вашего номера
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-inter">Информация о номере</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="number">Номер автомобиля</Label>
                <Input
                  id="number"
                  placeholder="А123АА"
                  value={newListing.number}
                  onChange={(e) => setNewListing({...newListing, number: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="region">Код региона</Label>
                <Input
                  id="region"
                  placeholder="77"
                  value={newListing.region}
                  onChange={(e) => setNewListing({...newListing, region: e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="price">Цена (₽)</Label>
              <Input
                id="price"
                type="number"
                placeholder="50000"
                value={newListing.price}
                onChange={(e) => setNewListing({...newListing, price: e.target.value})}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="seller">Ваше имя</Label>
                <Input
                  id="seller"
                  placeholder="Иван Петров"
                  value={newListing.seller}
                  onChange={(e) => setNewListing({...newListing, seller: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  placeholder="+7 (999) 123-45-67"
                  value={newListing.phone}
                  onChange={(e) => setNewListing({...newListing, phone: e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                placeholder="Расскажите о вашем номере..."
                value={newListing.description}
                onChange={(e) => setNewListing({...newListing, description: e.target.value})}
                className="min-h-20"
              />
            </div>

            <Button type="submit" className="w-full">
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить объявление
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddListingForm;