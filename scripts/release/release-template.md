# {{ APP_NAME }} - Release {{ VERSION }}

_Publiée le {{ RELEASE_DATE }}_

{{ APP_NAME }} passe en version **{{ VERSION }}** !

{% if WHAT_NEW %}
## ✨ Nouveautés et améliorations

{{ WHAT_NEW }}

{% endif %}
{% if BUG_FIXES_AND_MINOR_CHANGES %}
## 🔧 Correctifs et modifications mineures

{{ BUG_FIXES_AND_MINOR_CHANGES }}
{% endif %}

{% if BREAKING_CHANGES %}
## ⚠️ Attention : changements importants !

{{ BREAKING_CHANGES }}

{% endif %}

## 🙏 Remerciements

Merci à toutes les personnes qui ont contribué à l'évolution de ce projet !

Vous avez une idée, une suggestion ou vous avez rencontré un problème ?
N'hésitez pas à partager vos retours et à faire des propositions !

- 💬 [Signaler un bug ou faire une suggestion](https://forge.apps.education.fr/eyssette/js-template/-/work_items)

## 🔗 Plus d'informations

- 📄 [Consulter le CHANGELOG complet](https://forge.apps.education.fr/eyssette/js-template/-/blob/main/CHANGELOG.md)

