import React from 'react';
import PromptPackPage from '../../components/PromptPackPage';
import { getPromptPackBySlug } from '../../data/promptPacks';

const pack = getPromptPackBySlug('groothandel-prompts-2026')!;

const GroothandelPromptPack = () => <PromptPackPage pack={pack} />;

export default GroothandelPromptPack;
