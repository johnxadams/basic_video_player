# Slider

## 1. **getDimensions**

- Ruft die aktuellen Abmessungen des Sliders ab.

## 2. **onWindowResize**

- Berechnet die Slider-Dimensionen neu, wenn das Fenster resized wird.

## 3. **Leistungsoptimierung mit Lodash**

- Verwendet die `throttle`-Funktion von Lodash, um die Häufigkeit zu begrenzen, mit der `getDimensions` während einer Fenstergrößenänderung aufgerufen wird.

## 4. **Berechnungen für Füllung und Handler**

4.1 **fillRatio** Berechnet den Füllstand des Sliders als Verhältnis von aktuellem Wert zu Maximalwert.

4.2 **fillStyle** Erzeugt den Stil für den Füllbalken, der horizontal skaliert wird basierend auf dem Füllverhältnis.

4.3 **handlerStyle** Berechnet die horizontale Position des Handlers (Punkts), sodass er proportional zur aktuellen Füllung auf dem Balken sitzt.

<br>

# Slider Dragging

## 1. `onSliderMouseDown`

- `emit('dragstart')` when mouseDown on Slider

## 2. `onDocumentMouseUp`

- Emit if it's a `'click'` or `'dragging'`

### Bedingungen:

- Wenn das Klicken weniger als 100ms dauert:
  - `dragTimeout` ist gesetzt → **es handelt sich um einen Klick**
- Wenn das Klicken länger als 100ms dauert:
  - `dragTimeout` wird auf `null` gesetzt → **es handelt sich um ein Dragging**
  - → gehe zu `else`

## 3. `onDocumentMouseMove(e)`

- Soll `calculate(e)` Funktion auslösen

### In `calculate(e)`:

1. `barLevelX` wird über eine Helper-Funktion ermittelt

   - `getElementOffsetX(element):` Gibt die horizontale Position eines Elements relativ zum linken Rand des Dokuments zurück
   - `getRelativeXPosition(e, targetElement):` Bestimmt die X-Position eines Maus-Events relativ zum Ziel-Element und begrenzt den Wert auf dessen Breite mit clamp.

2. `volumeLevel = barLevelX / barWidth`
3. `interpolation = lerp(min, max, volumeLevel)`
4. `emit('input', interpolation)`

<br>

# Custom Control Tools - Player.vue

## Play / Pause

1. self closing `div` background -> class: `player_gradient`
2. Alle nötigen Quasar-Komponenten importieren
3. Slider hinzufügen – Breite auf 96px reduziert
4. Video-Element `videoRef` → `togglePlay` für Play/ Pause Icons & Video
   1. Wenn `video.pause()` aufgerufen wird, rufe die Funktion `video.play()` auf und umgekehrt
5. Wechsel das `playIcon` mit der `isPlaying`-Eigenschaft
   1. Verwende das native `videoTag`-Event → `onVideoPlay` & `onVideoPause`
6. `onDocumentKeyUp` → `pressplay` mit der Leertaste

<br>

## Sound Control

1. `onVideoVolumeChange` → Verwende das native `video`-Event, um die Lautstärke zu steuern
   1. `isMuted.value` wird das Icon umschalten
   2. Stellt sicher, dass die im Code gespeicherten Lautstärke-Informationen immer dem aktuellen Zustand des Videoelements entsprechen
2. `toggleSound`
   1. Wenn die Lautstärke stumm ist, kehre den Muter-Zustand um (true ⇄ false)
   2. Wenn die Lautstärke auf 0 ist, setze sie auf 0,5
3. `handleVolumeSliderChange(value)`
   1. Behandlet den input emit -> Reagiert auf eine Änderung des Sliders und passt die Lautstärke sowie die Stummschaltung des Videos an
4. Übergib die `volume`-Eigenschaft an den Slider: `:value` → `:value="isMuted ? 0 : volume"`
   1. Stellt sicher, dass ein Klick auf den SoundIcon das Video stumm schaltet (und umgekehrt)

<br>

## Fullscreen API screenfull

1. screenfull API ermöglicht vollbild
2. `onMounted` Callback → `screenfull.onchange(onFullscreenChange)`
   1. `isFullscreen.value` toggelt das vollbild-Icon

<br>

## TimeSeeker

1. Eine zweite Slider-Component, mit den Attributen:
   1. `:max="duration"`
   2. `:value="currentTime"`
   3. `@input="handleTimeSeeker"`
      1. Stellt sicher, dass der Benutzer den Slider klicken und ziehen kann

<br>

## Buffer

1. Das Video-Element feuert regelmäßig `progress`-Events, um den Ladefortschritt des Puffers zu überprüfen und die gepufferten Bereiche zu ermitteln.
2. Die Methode `onVideoProgress` berechnet den gepufferten Fortschritt relativ zur Gesamtlänge des Videos und speichert diesen in `bufferedProgress`.
3. Der `Slider` wird um einen visuellen "Buffer-Balken" erweitert, der dynamisch wächst und den Ladefortschritt des Videos anzeigt.
