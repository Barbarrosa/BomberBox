BombDeployer = function() {
   var self = this,
      m_weapon = new Weapon(),
      m_iTimeout = 3,
      m_iBombRadius = 1;

   self.getWeapon = function() {
      return m_weapon;
   };

   self.initialize = function(world) {
      m_weapon.initialize(world, 'WEAPON_BOMB', {
         useWeapon: function(iX, iY) {
            new Bomb(world, iX, iY, m_iTimeout, m_iBombRadius);
         },

         canUse: function(iX, iY) {
            return !world.locationHasTraits(iX, iY, [TILE_TRAIT.TRAIT_BOMB_INERT]);
         },

         upgrade: function(upgrade) {
            var upgrade = upgrade.bombUpgradeInfo;
            if (!upgrade) return;

            if (upgrade.timeout) {
               m_iTimeout = upgrade.timeout;
            }

            if (upgrade.radius) {
               m_iBombRadius = upgrade.radius;
            }
         }
      });
   };
};