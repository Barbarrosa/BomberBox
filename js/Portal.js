/**
 * Copyright © 2012-2013 Lee Bradley 
 * All Rights Reserved
 * 
 * NOTICE: All information herein is, and remains the property of
 * Lee Bradley. Dissemation of this information or reproduction of
 * this material is strictly forbidden unless prior written permission
 * is obtained from Lee Bradley.
 * 
 * The above copyright notice and this notice shall be included in
 * all copies or substantial portions of the Software.
 */

/**
 * Teleports to another portal
 * @param world
 * @param x
 * @param y
 */
Portal = function(world, x, y) {
   var self = this,
      m_tile = new Tile(world),
      m_sisterPortal,
      m_bIgnoreNextFriendly,
      
      CHAR_SISTER = 0,
      CHAR_IGNORE = 1;

   m_tile.setStyle(TILE_STYLE.TILE_TELEPORT);
   m_tile.setPosition(x, y);
   m_tile.setText('T');
   world.createTile(m_tile);

   self.teleportTo = function(tile) {
      m_bIgnoreNextFriendly = true;
      tile.teleport(m_tile.x, m_tile.y);
   };

   self.setSisterPortal = function(portal) {
      m_sisterPortal = portal;
   };

   self.fromState = function (state) {
      state[CHAR_SISTER] = m_sisterPortal;
      state[CHAR_IGNORE] = m_bIgnoreNextFriendly;
   };

   m_tile.setInteract(function(tile) {
      if (m_bIgnoreNextFriendly) {
         m_bIgnoreNextFriendly = false;
         return;
      }

      if (tile.teleport) {
         m_sisterPortal.teleportTo(tile);
      }
   });
};
