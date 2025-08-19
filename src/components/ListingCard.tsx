import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { LicensePlate } from './types';

interface ListingCardProps {
  listing: LicensePlate;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpenDetail: (listing: LicensePlate) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  isFavorite,
  onToggleFavorite,
  onOpenDetail,
}) => {
  return (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden">
      {listing.image && (
        <div className="relative h-48 bg-gray-100">
          <img 
            src={listing.image} 
            alt={`${listing.number} ${listing.region}`}
            className="w-full h-full object-cover"
          />
          <Button
            variant="outline"
            size="sm"
            className={`absolute top-2 right-2 p-2 ${isFavorite ? 'bg-red-50 border-red-200' : 'bg-white/90'}`}
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
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="font-inter text-xl flex items-center gap-2">
            <div className="bg-white border-2 border-gray-800 px-3 py-1 rounded text-base font-bold">
              {listing.number} {listing.region}
            </div>
          </CardTitle>
          {listing.featured && (
            <Badge className="bg-yellow-100 text-yellow-800">
              <Icon name="Star" size={14} className="mr-1" />
              VIP
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="text-2xl font-bold text-primary">
            {listing.price.toLocaleString()} ₽
          </div>
          <p className="font-opensans text-gray-600 text-sm">
            {listing.description}
          </p>
          <Separator />
          <div className="space-y-1 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Icon name="User" size={14} />
              {listing.seller}
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Phone" size={14} />
              {listing.phone}
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button 
              className="flex-1" 
              size="sm"
              onClick={() => onOpenDetail(listing)}
            >
              <Icon name="Eye" size={14} className="mr-1" />
              Подробнее
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onToggleFavorite(listing.id)}
            >
              <Icon 
                name="Heart" 
                size={14} 
                className={isFavorite ? 'text-red-500 fill-current' : ''}
              />
            </Button>
          </div>
          <div className="flex items-center justify-between pt-2 text-xs text-gray-400">
            <span>Просмотров: {listing.views || 0}</span>
            <span>{new Date(listing.dateAdded).toLocaleDateString('ru-RU')}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListingCard;