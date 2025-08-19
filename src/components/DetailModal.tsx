import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { LicensePlate } from './types';

interface DetailModalProps {
  listing: LicensePlate | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const DetailModal: React.FC<DetailModalProps> = ({
  listing,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  if (!listing) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-inter text-2xl flex items-center gap-2">
            <div className="bg-white border-2 border-gray-800 px-3 py-1 rounded text-lg font-bold">
              {listing.number} {listing.region}
            </div>
            {listing.featured && (
              <Badge className="bg-yellow-100 text-yellow-800">
                <Icon name="Star" size={14} className="mr-1" />
                VIP
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {listing.image && (
            <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={listing.image} 
                alt={`${listing.number} ${listing.region}`}
                className="w-full h-full object-cover"
              />
              <Button
                variant="outline"
                size="sm"
                className={`absolute top-3 right-3 p-2 ${isFavorite ? 'bg-red-50 border-red-200' : 'bg-white/90'}`}
                onClick={() => onToggleFavorite(listing.id)}
              >
                <Icon 
                  name="Heart" 
                  size={16} 
                  className={isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'}
                />
              </Button>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-inter font-semibold text-lg mb-3">Информация</h3>
              <div className="space-y-3">
                <div className="text-3xl font-bold text-primary">
                  {listing.price.toLocaleString()} ₽
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Icon name="MapPin" size={16} />
                  Регион {listing.region}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Icon name="Calendar" size={16} />
                  {new Date(listing.dateAdded).toLocaleDateString('ru-RU', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Icon name="Eye" size={16} />
                  {listing.views || 0} просмотров
                </div>
                {listing.category && (
                  <Badge variant="outline" className="capitalize">
                    {listing.category === 'premium' ? 'Премиум' : 
                     listing.category === 'exclusive' ? 'Эксклюзив' : 
                     'Стандарт'}
                  </Badge>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="font-inter font-semibold text-lg mb-3">Продавец</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Icon name="User" size={16} className="text-gray-400" />
                  <span className="font-medium">{listing.seller}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={16} className="text-gray-400" />
                  <span>{listing.phone}</span>
                </div>
                <div className="space-y-2">
                  <Button className="w-full">
                    <Icon name="Phone" size={16} className="mr-2" />
                    Позвонить
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Icon name="MessageCircle" size={16} className="mr-2" />
                    Написать
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-inter font-semibold text-lg mb-3">Описание</h3>
            <p className="font-opensans text-gray-700 leading-relaxed">
              {listing.description}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailModal;