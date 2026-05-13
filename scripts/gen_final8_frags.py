# -*- coding: utf-8 -*-
"""Emits 8 batch2 fragments: all 9 app locales, English text duplicated (PT→EN source)."""
import copy
import json
from pathlib import Path

D = Path(__file__).parent / "batch2-frags"
L = ("en", "ko", "es", "ja", "de", "fr", "it", "zh-CN", "zh-TW")


def nine(x):
    return {loc: copy.deepcopy(x) for loc in L}


def save(name, o):
    p = D / f"{name}.json"
    p.write_text(json.dumps(o, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("wrote", p.name)


# ---- English (from PT in victor-notes-posts.ts) + duplicate to all locales ----
save(
    "lamp-koibito-e-hirogaru-namida",
    nine(
        {
            "title": "Lamp - 恋人へ～ひろがるなみだ",
            "excerpt": "Lamp is a Japanese music project with roots in sounds close to city pop and soft indie; on YouTube, the official channel posts studio takes and release videos that accompany releases.",
            "body": [
                "Lamp is a Japanese music project with roots in sounds close to city pop and soft indie; on YouTube, the official channel posts studio takes and release videos that accompany releases. “恋人へ～ひろがるなみだ” (rough read: Koibito e ~ Hirogaru namida) is part of that body of work as a music video.",
            ],
        }
    ),
)

save(
    "julie-feminine-adornments",
    nine(
        {
            "title": "Julie - feminine adornments",
            "excerpt": "“julie” is a music project whose releases mix indie rock with textures close to shoegaze or dream pop, depending on the period and register of each track.",
            "body": [
                "“julie” is a music project whose releases mix indie rock with textures close to shoegaze or dream pop, depending on the period and register of each track. “feminine adornments” appears as a music video on the official channel.",
                "I’d call it a great stand-in for who I am. Ninety-five per cent of the time the one on the left, five per cent the one on the right.",
            ],
        }
    ),
)

save(
    "bonjr-its-ok-youre-ok",
    nine(
        {
            "title": "Bonjr - It's Ok, You're Ok",
            "excerpt": "Bonjr is an electronic-music project whose releases often explore soft textures, clean beats, and a near-hypnotic feel, common in blends of future beats, chill, and synthetic pop.",
            "body": [
                "Bonjr is an electronic-music project whose releases often explore soft textures, clean beats, and a near-hypnotic feel, common in blends of future beats, chill, and synthetic pop. “It's Ok, You're Ok” circulates as a video on the channel i'm cyborg but that's ok (a name that nods to the Park Chan-wook film), with scenes from *Wuthering Heights* (1939).",
            ],
        }
    ),
)

save(
    "blue-foundation-eyes-on-fire-official-music-video",
    nine(
        {
            "title": "Blue Foundation - Eyes On Fire (Official Music Video)",
            "excerpt": "Blue Foundation is a Danish band with roots in electronic and dream pop; “Eyes On Fire” (official video).",
            "body": [
                "Blue Foundation is a Danish band with roots in electronic and dream pop; “Eyes On Fire” in official music video form on the official channel.",
            ],
        }
    ),
)

save(
    "christian-loffler-ensemble-live-volksbuhne-berlin",
    nine(
        {
            "title": "Christian Löffler & Ensemble (Live at Volksbühne, Berlin)",
            "excerpt": "Christian Löffler is a German producer and musician associated with a strand of melodic house and techno with a strong emotional charge, slow soundscapes, fragmented voices, and textures that edge toward ambient.",
            "body": [
                "Christian Löffler is a German producer and musician associated with a strand of melodic house and techno with a strong emotional charge, slow soundscapes, fragmented voices, and textures that edge toward ambient. This release captures a concert with ensemble at the Volksbühne (Berlin), a theatre and culture house known for stage experimentation.",
            ],
        }
    ),
)

save(
    "resilience-memory-reboot",
    nine(
        {
            "title": "Resilience - Memory Reboot",
            "excerpt": "GhostEdits posts edits and mashups with a feel close to remixing and to audiovisual web culture, sometimes linked to games or to electronic-leaning soundscapes.",
            "body": [
                "GhostEdits posts edits and mashups with a feel close to remixing and to audiovisual web culture, sometimes linked to games or to electronic-leaning soundscapes. “Memory Reboot” appears here under the “Resilience” heading, as a music-video or rhythmic cut on YouTube.",
            ],
        }
    ),
)

save(
    "the-big-push",
    nine(
        {
            "title": "The Big Push",
            "excerpt": "The Big Push is a band that emerged from Brighton’s busking scene, formed by Ren Gill, Romain Axisa, Gorran Kendall, and Glenn Chambers.",
            "body": [
                "The Big Push is a band that emerged from Brighton’s busking scene, formed by Ren Gill, Romain Axisa, Gorran Kendall, and Glenn Chambers. The group became known for that street start: very physical live shows, circulation through online video, and a style that combined performance energy, cover rearrangements, and original songs.",
                "Recorded in Brighton and posted on the band’s official channel, the medley weaves “I Shot the Sheriff” and “Road to Zion” with a rap/hip-hop section, turning familiar reference points into a rawer, more wide-open read that leans on live energy.",
            ],
        }
    ),
)

save(
    "vice-documentarios",
    nine(
        {
            "title": "VICE",
            "excerpt": "VICE brings together documentaries, video reportage, and series on politics, crime, drugs, technology, war, culture, and city life, usually in a more immersive, direct idiom than conventional TV news.",
            "body": [
                "VICE brings together documentaries, video reportage, and series on politics, crime, drugs, technology, war, culture, and city life, usually in a more immersive, direct idiom than conventional TV news. Across the brand’s ecosystem, that material shows up in VICE Video and in productions on platforms like YouTube and VICE TV.",
            ],
        }
    ),
)
