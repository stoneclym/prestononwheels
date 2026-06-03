/* Preston on Wheels — Tweaks panel (hero, font, banner color, accent) */
const POW_DEFAULTS = /*EDITMODE-BEGIN*/{
  "hero": "split",
  "font": "oswald",
  "banner": "navy",
  "accent": "#c8803a"
}/*EDITMODE-END*/;

// accent hex -> darker "deep" shade used for hovers
const ACCENT_DEEP = {
  "#c8803a": "#a9692c", // amber (default)
  "#b23a2e": "#8f2c22", // brick red
  "#cf9a1f": "#a87d12", // mustard gold
  "#2f7d8a": "#245e68"  // steel teal
};

function PowTweaks() {
  const [t, setTweak] = useTweaks(POW_DEFAULTS);

  React.useEffect(() => {
    const root = document.documentElement;
    root.dataset.hero = t.hero;
    root.dataset.font = t.font;
    root.dataset.banner = t.banner;
    root.style.setProperty('--amber', t.accent);
    root.style.setProperty('--amber-deep', ACCENT_DEEP[t.accent] || t.accent);
    if (window.__powMap) setTimeout(() => window.__powMap.invalidateSize(), 250);
  }, [t.hero, t.font, t.banner, t.accent]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Hero layout" />
      <TweakRadio
        label="Style"
        value={t.hero}
        options={['split', 'emblem', 'banner']}
        onChange={(v) => setTweak('hero', v)}
      />
      {t.hero === 'banner' && (
        <TweakRadio
          label="Banner color"
          value={t.banner}
          options={['navy', 'cream']}
          onChange={(v) => setTweak('banner', v)}
        />
      )}
      <TweakSection label="Typography" />
      <TweakSelect
        label="Heading font"
        value={t.font}
        options={[
          { value: 'oswald', label: 'Oswald (condensed)' },
          { value: 'bebas', label: 'Bebas Neue (tall)' },
          { value: 'slab', label: 'Zilla Slab (slab serif)' },
        ]}
        onChange={(v) => setTweak('font', v)}
      />
      <TweakSection label="Accent color" />
      <TweakColor
        label="Accent"
        value={t.accent}
        options={['#c8803a', '#b23a2e', '#cf9a1f', '#2f7d8a']}
        onChange={(v) => setTweak('accent', v)}
      />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<PowTweaks />);
