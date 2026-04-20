import React from 'react';
import PromptPackPage from '../../components/PromptPackPage';
import { getPromptPackBySlug } from '../../data/promptPacks';

const pack = getPromptPackBySlug('maakindustrie-prompts-2026')!;

const MaakindustriePromptPack = () => <PromptPackPage pack={pack} />;

export default MaakindustriePromptPack;
