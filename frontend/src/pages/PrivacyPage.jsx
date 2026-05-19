import React from "react";
import { Helmet } from "react-helmet-async";

export default function PrivacyPage() {
  return (
    <>
      <Helmet>
        <title>Politique de Confidentialité - Green Market</title>
        <meta name="description" content="Politique de confidentialité de Green Market" />
      </Helmet>

      <div className="p-4 min-h-screen max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8">Politique de Confidentialité</h1>
        
        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold mb-3 text-[var(--color-main)]">1. Introduction</h2>
            <p>
              Green Market est une plateforme e-commerce de vente de produits écologiques. Cette Politique de Confidentialité explique de manière claire, honnête et précise comment nous traitons vos données personnelles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-[var(--color-main)]">2. Informations que nous collectons</h2>
            <p>Nous collectons uniquement les informations essentielles au fonctionnement de la plateforme:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li><strong>À l'inscription:</strong> nom complet, adresse email, mot de passe (hashé)</li>
              <li><strong>Rôle utilisateur:</strong> définit automatiquement comme "client" (peut être modifié via administration)</li>
              <li><strong>Données de commande:</strong> articles commandés, quantités, montant total, statut de commande</li>
              <li><strong>Token d'authentification:</strong> conservé localement pour maintenir votre session</li>
            </ul>
            <p className="mt-4 italic text-gray-600">
              <strong>Nous NE collectons PAS:</strong> Votre temps passé sur le site, pages visitées, adresse IP, données de localisation, informations de device, ou toute forme de tracking analytics.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-[var(--color-main)]">3. Utilisation des informations</h2>
            <p>Vos informations sont utilisées uniquement pour:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Créer et gérer votre compte utilisateur</li>
              <li>Vous authentifier et maintenir votre session sécurisée</li>
              <li>Traiter et enregistrer vos commandes</li>
              <li>Vous permettre de consulter votre historique de commandes</li>
              <li>Permettre aux producteurs de créer et gérer leurs produits</li>
            </ul>
            <p className="mt-3 text-gray-600">
              Nous ne vous envoyons pas de communications marketing ni de newsletters. Nous n'effectuons pas d'analyse de comportement utilisateur.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-[var(--color-main)]">4. Partage des informations</h2>
            <p>
              Nous ne partageons, ne vendons et ne transférons JAMAIS vos informations personnelles à des tiers quels qu'ils soient. Vos données restent entièrement confidentielles et stockées uniquement sur notre serveur.
            </p>
            <p className="mt-3 text-gray-600">
              Les informations de profil public (nom, produits créés pour les producteurs) peuvent être visibles d'autres utilisateurs dans le contexte fonctionnel de la plateforme, mais les données sensibles (email, mot de passe) restent privées.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-[var(--color-main)]">5. Sécurité des données</h2>
            <p>
              La protection de vos données est notre priorité absolue:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Vos mots de passe sont <strong>toujours hashé</strong> (non stockés en clair)</li>
              <li>Accès à la base de données limité et sécurisé</li>
              <li>Tokens d'authentification expirables et à usage unique</li>
              <li>Communication via HTTPS en production</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-[var(--color-main)]">6. Stockage local (localStorage)</h2>
            <p>
              Nous utilisons le stockage local du navigateur (<code>localStorage</code>) uniquement pour:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Sauvegarder votre token d'authentification entre les sessions</li>
              <li>Maintenir votre connexion sans vous demander de vous identifier à chaque action</li>
            </ul>
            <p className="mt-3 text-gray-600">
              Vous pouvez nettoyer votre localStorage à tout moment via les paramètres de votre navigateur. Cela vous déconnectera automatiquement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-[var(--color-main)]">7. Durée de conservation des données</h2>
            <p>
              Vos données sont conservées aussi longtemps que votre compte reste actif. Si vous demandez la suppression de votre compte:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Votre profil utilisateur sera supprimé</li>
              <li>Votre email sera retiré de la base de données</li>
              <li>Vos commandes historiques peuvent être conservées (légalement) pour les dossiers comptables et fiscaux</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-[var(--color-main)]">8. Vos droits RGPD</h2>
            <p>
              En tant que résident de l'Union Européenne, vous avez des droits spécifiques en vertu du Règlement Général sur la Protection des Données (RGPD):
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li><strong>Droit d'accès:</strong> Vous pouvez demander une copie de vos données personnelles</li>
              <li><strong>Droit de rectification:</strong> Vous pouvez corriger vos informations personnelles (nom, email)</li>
              <li><strong>Droit à l'oubli (suppression):</strong> Vous pouvez demander la suppression de votre compte et de vos données</li>
              <li><strong>Droit à la portabilité:</strong> Vous pouvez demander une exportation de vos données dans un format lisible</li>
              <li><strong>Droit d'opposition:</strong> Vous pouvez contester le traitement de vos données</li>
            </ul>
            <p className="mt-3">
              Pour exercer l'un de ces droits, veuillez nous contacter à <span className="font-semibold">privacy@greenmarket.com</span>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-[var(--color-main)]">9. Modifications de cette politique</h2>
            <p>
              Nous pouvons mettre à jour cette Politique de Confidentialité périodiquement. Toute modification sera publiée sur cette page avec une date de mise à jour. Votre utilisation continue de la plateforme après les modifications constitue votre acceptation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-[var(--color-main)]">10. Contact et réclamations</h2>
            <p>
              Si vous avez des questions sur cette Politique de Confidentialité ou souhaitez exercer vos droits, veuillez nous contacter:
            </p>
            <ul className="mt-3 space-y-1">
              <li><strong>Email:</strong> privacy@greenmarket.com</li>
              <li><strong>Sujet:</strong> Requête RGPD ou question confidentialité</li>
            </ul>
            <p className="mt-4 text-gray-600">
              Vous avez également le droit de déposer une plainte auprès de votre autorité de protection des données locale (CNIL en France) si vous estimez que nous ne respectons pas vos droits.
            </p>
          </section>
        </div>

        <div className="mt-12 p-6 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-gray-600 text-center">
            Dernière mise à jour: Avril 2026
          </p>
        </div>
      </div>
    </>
  );
}
