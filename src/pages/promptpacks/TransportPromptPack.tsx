import React from 'react';
import PromptPackPage from '../../components/PromptPackPage';
import { getPromptPackBySlug } from '../../data/promptPacks';

const pack = getPromptPackBySlug('transport-prompts-2026')!;

const TransportPromptPack = () => <PromptPackPage pack={pack} />;

export default TransportPromptPack;
