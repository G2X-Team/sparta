import React from 'react';
import type { SampleStory } from './utils/util';
import { Calendar } from '../../src';

// the name of this function should be the name of the story in the docs
export const StandardCalendar: SampleStory = (args) => <Calendar {...args} />;
