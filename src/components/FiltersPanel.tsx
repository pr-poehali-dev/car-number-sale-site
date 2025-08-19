import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface FiltersPanelProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  showFilters: boolean;
  setShowFilters: (value: boolean) => void;
  showNotifications: boolean;
  setShowNotifications: (value: boolean) => void;
  notifications: string[];
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  selectedRegion: string;
  setSelectedRegion: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  regions: string[];
  onResetFilters: () => void;
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({
  searchQuery,
  setSearchQuery,
  showFilters,
  setShowFilters,
  showNotifications,
  setShowNotifications,
  notifications,
  priceRange,
  setPriceRange,
  selectedRegion,
  setSelectedRegion,
  sortBy,
  setSortBy,
  regions,
  onResetFilters,
}) => {
  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-2 max-w-md mx-auto mb-4">
        <div className="relative flex-1">
          <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Поиск по номеру или региону"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={() => setShowFilters(!showFilters)} variant="outline">
          <Icon name="Filter" size={16} />
        </Button>
        <Button 
          variant="outline" 
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative"
        >
          <Icon name="Bell" size={16} />
          {notifications.length > 0 && (
            <Badge className="absolute -top-2 -right-2 px-1 min-w-[20px] h-5 text-xs">
              {notifications.length}
            </Badge>
          )}
        </Button>
      </div>

      {/* Notifications */}
      {showNotifications && notifications.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg max-w-2xl mx-auto mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-inter font-semibold text-blue-900">Уведомления</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setNotifications([])}
            >
              Очистить
            </Button>
          </div>
          <div className="space-y-2">
            {notifications.slice(0, 5).map((notification, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-blue-800">
                <Icon name="Bell" size={14} />
                {notification}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      {showFilters && (
        <div className="bg-white p-4 rounded-lg border shadow-sm max-w-2xl mx-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">Цена (₽)</Label>
              <div className="px-2">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={500000}
                  min={0}
                  step={5000}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{priceRange[0].toLocaleString()}</span>
                  <span>{priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Регион</Label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="Все регионы" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все регионы</SelectItem>
                  {regions.map(region => (
                    <SelectItem key={region} value={region}>{region}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Сортировка</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">По дате (новые)</SelectItem>
                  <SelectItem value="date-asc">По дате (старые)</SelectItem>
                  <SelectItem value="price-asc">По цене (дешевле)</SelectItem>
                  <SelectItem value="price-desc">По цене (дороже)</SelectItem>
                  <SelectItem value="views-desc">По популярности</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={onResetFilters}
            >
              Сбросить фильтры
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FiltersPanel;