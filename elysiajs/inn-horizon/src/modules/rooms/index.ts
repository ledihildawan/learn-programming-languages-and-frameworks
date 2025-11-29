import { Elysia, t } from "elysia";
import { authMiddleware, requireRole } from "../../middlewares/auth";
import {
  CreateRoomSchema,
  UpdateRoomSchema,
  GetRoomsQuerySchema,
  CheckAvailabilitySchema,
  AddRoomPhotoSchema,
  UpdateRoomPhotoOrderSchema,
} from "./room.schema";
import {
  createRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  addRoomPhoto,
  getRoomPhotos,
  updateRoomPhotosOrder,
  deleteRoomPhoto,
  checkRoomAvailability,
  getAvailableRooms,
  getRoomTypes,
} from "./room.service";

export const roomsRoute = new Elysia({ prefix: "/rooms" })
  // ====================== PUBLIC ROUTES ======================

  /**
   * @route GET /api/rooms
   * @desc Get all rooms with filters
   * @access Public
   */
  .get(
    "/",
    async ({ query, set }) => {
      try {
        const result = await getRooms(query);
        return {
          success: true,
          data: result,
        };
      } catch (error: any) {
        set.status = 400;
        return {
          success: false,
          error: error.message || "Failed to get rooms",
        };
      }
    },
    {
      query: GetRoomsQuerySchema,
      detail: {
        tags: ["Rooms"],
        summary: "Get rooms list",
        description: "Get paginated list of rooms with filters",
      },
    },
  )

  /**
   * @route GET /api/rooms/:id
   * @desc Get room by ID
   * @access Public
   */
  .get(
    "/:id",
    async ({ params, set }) => {
      try {
        const room = await getRoomById(params.id);
        return {
          success: true,
          data: room,
        };
      } catch (error: any) {
        set.status = 404;
        return {
          success: false,
          error: error.message || "Room not found",
        };
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      detail: {
        tags: ["Rooms"],
        summary: "Get room by ID",
        description: "Get detailed room information by ID",
      },
    },
  )

  /**
   * @route GET /api/rooms/:id/availability
   * @desc Check room availability
   * @access Public
   */
  .get(
    "/:id/availability",
    async ({ params, query, set }) => {
      try {
        const availability = await checkRoomAvailability(params.id, query);
        return {
          success: true,
          data: availability,
        };
      } catch (error: any) {
        set.status = 400;
        return {
          success: false,
          error: error.message || "Failed to check availability",
        };
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      query: CheckAvailabilitySchema,
      detail: {
        tags: ["Rooms"],
        summary: "Check room availability",
        description: "Check if room is available for given dates",
      },
    },
  )

  /**
   * @route GET /api/rooms/hotel/:hotelId/available
   * @desc Get available rooms for a hotel
   * @access Public
   */
  .get(
    "/hotel/:hotelId/available",
    async ({ params, query, set }) => {
      try {
        const result = await getAvailableRooms(params.hotelId, query);
        return {
          success: true,
          data: result,
        };
      } catch (error: any) {
        set.status = 400;
        return {
          success: false,
          error: error.message || "Failed to get available rooms",
        };
      }
    },
    {
      params: t.Object({
        hotelId: t.String(),
      }),
      query: CheckAvailabilitySchema,
      detail: {
        tags: ["Rooms"],
        summary: "Get available rooms",
        description: "Get all available rooms for a hotel and date range",
      },
    },
  )

  /**
   * @route GET /api/rooms/hotel/:hotelId/types
   * @desc Get room types for a hotel
   * @access Public
   */
  .get(
    "/hotel/:hotelId/types",
    async ({ params, set }) => {
      try {
        const types = await getRoomTypes(params.hotelId);
        return {
          success: true,
          data: types,
        };
      } catch (error: any) {
        set.status = 400;
        return {
          success: false,
          error: error.message || "Failed to get room types",
        };
      }
    },
    {
      params: t.Object({
        hotelId: t.String(),
      }),
      detail: {
        tags: ["Rooms"],
        summary: "Get room types",
        description: "Get all room types available in a hotel",
      },
    },
  )

  // ====================== PROTECTED ROUTES (HOST & ADMIN) ======================
  .group("", (app) =>
    app
      .use(authMiddleware)

      /**
       * @route POST /api/rooms
       * @desc Create a new room
       * @access Private (HOST, ADMIN)
       */
      .post(
        "/",
        async ({ user, body, set }) => {
          try {
            // Only HOST and ADMIN can create rooms
            if (user.role !== "HOST" && user.role !== "ADMIN") {
              set.status = 403;
              return {
                success: false,
                error: "Only hosts and admins can create rooms",
              };
            }

            const room = await createRoom(user.id, body);
            set.status = 201;
            return {
              success: true,
              message: "Room created successfully",
              data: room,
            };
          } catch (error: any) {
            set.status = 400;
            return {
              success: false,
              error: error.message || "Failed to create room",
            };
          }
        },
        {
          body: CreateRoomSchema,
          detail: {
            tags: ["Rooms", "Host"],
            summary: "Create room",
            description: "Create a new room for a hotel (Host/Admin only)",
            security: [{ bearerAuth: [] }],
          },
        },
      )

      /**
       * @route PUT /api/rooms/:id
       * @desc Update room
       * @access Private (Owner/HOST or ADMIN)
       */
      .put(
        "/:id",
        async ({ user, params, body, set }) => {
          try {
            const room = await updateRoom(params.id, user.id, body);
            return {
              success: true,
              message: "Room updated successfully",
              data: room,
            };
          } catch (error: any) {
            set.status = 400;
            return {
              success: false,
              error: error.message || "Failed to update room",
            };
          }
        },
        {
          params: t.Object({
            id: t.String(),
          }),
          body: UpdateRoomSchema,
          detail: {
            tags: ["Rooms", "Host"],
            summary: "Update room",
            description: "Update room information (Owner only)",
            security: [{ bearerAuth: [] }],
          },
        },
      )

      /**
       * @route DELETE /api/rooms/:id
       * @desc Delete room (soft delete)
       * @access Private (Owner/HOST or ADMIN)
       */
      .delete(
        "/:id",
        async ({ user, params, set }) => {
          try {
            await deleteRoom(params.id, user.id);
            return {
              success: true,
              message: "Room deleted successfully",
            };
          } catch (error: any) {
            set.status = 400;
            return {
              success: false,
              error: error.message || "Failed to delete room",
            };
          }
        },
        {
          params: t.Object({
            id: t.String(),
          }),
          detail: {
            tags: ["Rooms", "Host"],
            summary: "Delete room",
            description: "Soft delete room (Owner only)",
            security: [{ bearerAuth: [] }],
          },
        },
      )

      // ====================== ROOM PHOTOS ======================

      /**
       * @route POST /api/rooms/:id/photos
       * @desc Add room photo
       * @access Private (Owner/HOST or ADMIN)
       */
      .post(
        "/:id/photos",
        async ({ user, params, body, set }) => {
          try {
            const photo = await addRoomPhoto(
              params.id,
              user.id,
              body.url,
              body.order,
            );
            set.status = 201;
            return {
              success: true,
              message: "Photo added successfully",
              data: photo,
            };
          } catch (error: any) {
            set.status = 400;
            return {
              success: false,
              error: error.message || "Failed to add photo",
            };
          }
        },
        {
          params: t.Object({
            id: t.String(),
          }),
          body: AddRoomPhotoSchema,
          detail: {
            tags: ["Rooms", "Host"],
            summary: "Add room photo",
            description: "Add a new photo to room gallery (Owner only)",
            security: [{ bearerAuth: [] }],
          },
        },
      )

      /**
       * @route GET /api/rooms/:id/photos
       * @desc Get room photos
       * @access Public
       */
      .get(
        "/:id/photos",
        async ({ params, set }) => {
          try {
            const photos = await getRoomPhotos(params.id);
            return {
              success: true,
              data: photos,
            };
          } catch (error: any) {
            set.status = 400;
            return {
              success: false,
              error: error.message || "Failed to get photos",
            };
          }
        },
        {
          params: t.Object({
            id: t.String(),
          }),
          detail: {
            tags: ["Rooms"],
            summary: "Get room photos",
            description: "Get all photos of a room",
          },
        },
      )

      /**
       * @route PUT /api/rooms/:id/photos/order
       * @desc Update room photos order
       * @access Private (Owner/HOST or ADMIN)
       */
      .put(
        "/:id/photos/order",
        async ({ user, params, body, set }) => {
          try {
            const photos = await updateRoomPhotosOrder(
              params.id,
              user.id,
              body.photos,
            );
            return {
              success: true,
              message: "Photos order updated successfully",
              data: photos,
            };
          } catch (error: any) {
            set.status = 400;
            return {
              success: false,
              error: error.message || "Failed to update photos order",
            };
          }
        },
        {
          params: t.Object({
            id: t.String(),
          }),
          body: UpdateRoomPhotoOrderSchema,
          detail: {
            tags: ["Rooms", "Host"],
            summary: "Update photos order",
            description: "Update the display order of room photos (Owner only)",
            security: [{ bearerAuth: [] }],
          },
        },
      )

      /**
       * @route DELETE /api/rooms/:id/photos/:photoId
       * @desc Delete room photo
       * @access Private (Owner/HOST or ADMIN)
       */
      .delete(
        "/:id/photos/:photoId",
        async ({ user, params, set }) => {
          try {
            await deleteRoomPhoto(params.id, user.id, params.photoId);
            return {
              success: true,
              message: "Photo deleted successfully",
            };
          } catch (error: any) {
            set.status = 400;
            return {
              success: false,
              error: error.message || "Failed to delete photo",
            };
          }
        },
        {
          params: t.Object({
            id: t.String(),
            photoId: t.String(),
          }),
          detail: {
            tags: ["Rooms", "Host"],
            summary: "Delete room photo",
            description: "Delete a photo from room gallery (Owner only)",
            security: [{ bearerAuth: [] }],
          },
        },
      ),
  );
