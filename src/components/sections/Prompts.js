// Prompts.js
import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { promptsData } from '../../data/prompts';
import "../../styles/sections/Prompts.css";

const Prompts = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <section className="prompts-section" id="prompts">
            <div className="prompts-container">
                <SectionHeader
                    title="Summer 2025 Categories"
                    subtitle="Brief overviews of this year's challenge areas"
                />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="prompts-grid">
                        {promptsData.map((prompt, index) => (
                            <motion.div
                                key={prompt.id}
                                className="prompt-card"
                                variants={cardVariants}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="prompt-header">
                                    <div className="prompt-title-container">
                                        <h3 className="prompt-title">{prompt.title}</h3>
                                    </div>
                                    <span className="difficulty-badge">
                                        Challenge Rating: {prompt.difficulty}
                                    </span>
                                </div>

                                <p className="prompt-description">
                                    {prompt.description}
                                </p>

                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Prompts;