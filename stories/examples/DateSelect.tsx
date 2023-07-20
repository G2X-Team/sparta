import React from 'react';
import type { SampleStory } from './utils/util';
import { DateSelect } from '../../src';

// the name of this function should be the name of the story in the docs
export const BasicDateSelect: SampleStory = (args) => <DateSelect {...args} />;
