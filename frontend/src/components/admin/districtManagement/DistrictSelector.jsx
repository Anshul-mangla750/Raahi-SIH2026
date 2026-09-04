import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { DISTRICT_OPTIONS } from '@/data/admin/districtManagementData';
import { toast } from 'sonner';

export const DistrictSelector = ({ selectedDistrict, onSelectDistrict }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentOption =
    DISTRICT_OPTIONS.find((d) => d.id === selectedDistrict) || DISTRICT_OPTIONS[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (district) => {
    onSelectDistrict(district.id);
    setIsOpen(false);
    toast.success(`District set to: ${district.name}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: 'fit-content' }}>
      <label
        style={{
          fontSize: '11.5px',
          fontWeight: 500,
          color: '#64748B',
        }}
      >
        Select District
      </label>

      <div ref={dropdownRef} style={{ position: 'relative', width: '270px' }}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: '100%',
            height: '36px',
            backgroundColor: '#ffffff',
            border: '1px solid #E2E8F0',
            borderRadius: '6px',
            padding: '0 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '13px',
            fontWeight: 500,
            color: '#0F172A',
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
            transition: 'border-color 0.15s ease',
          }}
        >
          <span>{currentOption.name}</span>
          <ChevronDown
            size={16}
            color="#64748B"
            style={{
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
            }}
          />
        </button>

        {isOpen && (
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 4px)',
              left: 0,
              width: '100%',
              backgroundColor: '#ffffff',
              border: '1px solid #E2E8F0',
              borderRadius: '6px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              zIndex: 30,
              overflow: 'hidden',
            }}
          >
            {DISTRICT_OPTIONS.map((opt) => {
              const isSelected = opt.id === currentOption.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelect(opt)}
                  style={{
                    padding: '8px 12px',
                    fontSize: '12.5px',
                    color: isSelected ? '#059669' : '#334155',
                    backgroundColor: isSelected ? '#F0FDF4' : 'transparent',
                    fontWeight: isSelected ? 600 : 500,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'background-color 0.1s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.backgroundColor = '#F8FAFC';
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <span>{opt.name}</span>
                  {isSelected && <Check size={14} color="#059669" />}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
