'use client';

import React from 'react';
import { Settings } from 'lucide-react';
import { BaseItem } from '../components/base-item';

export const SettingsItem = () => {
  return <BaseItem icon={<Settings className='w-4 h-4 shrink-0' strokeWidth={2.3} />} label='Settings' />;
};
