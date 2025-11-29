import { Elysia, t } from "elysia";
import {
  authMiddleware,
  requireRole,
  optionalAuthMiddleware,
} from "../../middlewares/auth";
import {
  CreateHotelSchema,
  UpdateHotelSchema,
  GetHotelsQuerySchema,
  AddHotelPhotoSchema,
  UpdateHotelPhotoOrderSchema,
  AddHotelAmenitySchema,
  UpdateHotelAmenitySchema,
  UpdateCoverPhotoSchema,
} from "./hotel.schema";
import {
  createHotel,
  getHotels,
  getHotelById,
  getHotelBySlug,
  updateHotel,
  deleteHotel,
  updateHotelCoverPhoto,
  addHotelPhoto,
  getHotelPhotos,
  updateHotelPhotosOrder,
  deleteHotelPhoto,
  addHotelAmenity,
  getHotelAmenities,
  updateHotelAmenity,
  deleteHotelAmenity,
  getHotelStatistics,
  getCities,
} from "./hotel.service";

export const hotelsRoute = new Elysia({ prefix: "/hotels" })
  // ====================== PUBLIC ROUTES ======================

  /**
   * @route GET /api/hotels
   * @desc Get all hotels with filters
   * @access Public
   */
  .get(
    "/",
    async ({ query, set }) => {
      try {
        const result = await getHotels(query);
        return {
          success: true,
          data: result,
        };
      } catch (error: any) {
        set.status = 400;
        return {
          success: false,
          error: error.message || "Failed to get hotels",
        };
      }
    },
    {
      query: GetHotelsQuerySchema,
      detail: {
        tags: ["Hotels"],
        summary: "Get hotels list",
        description: "Get paginated list of hotels with filters",
      },
    },
  )

  /**
   * @route GET /api/hotels/cities
   * @desc Get all cities with hotels
   * @access Public
   */
  .get(
    "/cities",
    async ({ set }) => {
      try {
        const cities = await getCities();
        return {
          success: true,
          data: cities,
        };
      } catch (error: any) {
        set.status = 400;
        return {
          success: false,
          error: error.message || "Failed to get cities",
        };
      }
    },
    {
      detail: {
        tags: ["Hotels"],
        summary: "Get cities",
        description: "Get list of cities with active hotels",
      },
    },
  )

  /**
   * @route GET /api/hotels/slug/:slug
   * @desc Get hotel by slug
   * @access Public
   */
  .get(
    "/slug/:slug",
    async ({ params, set }) => {
      try {
        const hotel = await getHotelBySlug(params.slug);
        return {
          success: true,
          data: hotel,
        };
      } catch (error: any) {
        set.status = 404;
        return {
          success: false,
          error: error.message || "Hotel not found",
        };
      }
    },
    {
      params: t.Object({
        slug: t.String(),
      }),
      detail: {
        tags: ["Hotels"],
        summary: "Get hotel by slug",
        description: "Get detailed hotel information by slug",
      },
    },
  )

  /**
   * @route GET /api/hotels/:id
   * @desc Get hotel by ID
   * @access Public
   */
  .get(
    "/:id",
    async ({ params, set }) => {
      try {
        const hotel = await getHotelById(params.id);
        return {
          success: true,
          data: hotel,
        };
      } catch (error: any) {
        set.status = 404;
        return {
          success: false,
          error: error.message || "Hotel not found",
        };
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      detail: {
        tags: ["Hotels"],
        summary: "Get hotel by ID",
        description: "Get detailed hotel information by ID",
      },
    },
  )

  // ====================== PROTECTED ROUTES (HOST & ADMIN) ======================
  .group("", (app) =>
    app
      .use(authMiddleware)

      /**
       * @route POST /api/hotels
       * @desc Create a new hotel
       * @access Private (HOST, ADMIN)
       */
      .post(
        "/",
        async ({ user, body, set }) => {
          try {
            // Only HOST and ADMIN can create hotels
            if (user.role !== "HOST" && user.role !== "ADMIN") {
              set.status = 403;
              return {
                success: false,
                error: "Only hosts and admins can create hotels",
              };
            }

            const hotel = await createHotel(user.id, body);
            set.status = 201;
            return {
              success: true,
              message: "Hotel created successfully",
              data: hotel,
            };
          } catch (error: any) {
            set.status = 400;
            return {
              success: false,
              error: error.message || "Failed to create hotel",
            };
          }
        },
        {
          body: CreateHotelSchema,
          detail: {
            tags: ["Hotels", "Host"],
            summary: "Create hotel",
            description: "Create a new hotel (Host/Admin only)",
            security: [{ bearerAuth: [] }],
          },
        },
      )

      /**
       * @route GET /api/hotels/my/statistics
       * @desc Get hotel statistics for current user
       * @access Private (HOST, ADMIN)
       */
      .get(
        "/my/statistics",
        async ({ user, set }) => {
          console.log(user);
          try {
            if (user.role !== "HOST" && user.role !== "ADMIN") {
              set.status = 403;
              return {
                success: false,
                error: "Only hosts can view statistics",
              };
            }

            const stats = await getHotelStatistics(user.id);
            return {
              success: true,
              data: stats,
            };
          } catch (error: any) {
            set.status = 400;
            return {
              success: false,
              error: error.message || "Failed to get statistics",
            };
          }
        },
        {
          detail: {
            tags: ["Hotels", "Host"],
            summary: "Get hotel statistics",
            description: "Get statistics for hotels owned by current user",
            security: [{ bearerAuth: [] }],
          },
        },
      )

      /**
       * @route PUT /api/hotels/:id
       * @desc Update hotel
       * @access Private (Owner/HOST or ADMIN)
       */
      .put(
        "/:id",
        async ({ user, params, body, set }) => {
          try {
            const hotel = await updateHotel(params.id, user.id, body);
            return {
              success: true,
              message: "Hotel updated successfully",
              data: hotel,
            };
          } catch (error: any) {
            set.status = 400;
            return {
              success: false,
              error: error.message || "Failed to update hotel",
            };
          }
        },
        {
          params: t.Object({
            id: t.String(),
          }),
          body: UpdateHotelSchema,
          detail: {
            tags: ["Hotels", "Host"],
            summary: "Update hotel",
            description: "Update hotel information (Owner only)",
            security: [{ bearerAuth: [] }],
          },
        },
      )

      /**
       * @route PATCH /api/hotels/:id/cover-photo
       * @desc Update hotel cover photo
       * @access Private (Owner/HOST or ADMIN)
       */
      .patch(
        "/:id/cover-photo",
        async ({ user, params, body, set }) => {
          try {
            const hotel = await updateHotelCoverPhoto(
              params.id,
              user.id,
              body.coverPhoto,
            );
            return {
              success: true,
              message: "Cover photo updated successfully",
              data: hotel,
            };
          } catch (error: any) {
            set.status = 400;
            return {
              success: false,
              error: error.message || "Failed to update cover photo",
            };
          }
        },
        {
          params: t.Object({
            id: t.String(),
          }),
          body: UpdateCoverPhotoSchema,
          detail: {
            tags: ["Hotels", "Host"],
            summary: "Update cover photo",
            description: "Update hotel cover photo (Owner only)",
            security: [{ bearerAuth: [] }],
          },
        },
      )

      /**
       * @route DELETE /api/hotels/:id
       * @desc Delete hotel (soft delete)
       * @access Private (Owner/HOST or ADMIN)
       */
      .delete(
        "/:id",
        async ({ user, params, set }) => {
          try {
            await deleteHotel(params.id, user.id);
            return {
              success: true,
              message: "Hotel deleted successfully",
            };
          } catch (error: any) {
            set.status = 400;
            return {
              success: false,
              error: error.message || "Failed to delete hotel",
            };
          }
        },
        {
          params: t.Object({
            id: t.String(),
          }),
          detail: {
            tags: ["Hotels", "Host"],
            summary: "Delete hotel",
            description: "Soft delete hotel (Owner only)",
            security: [{ bearerAuth: [] }],
          },
        },
      )

      // ====================== HOTEL PHOTOS ======================

      /**
       * @route POST /api/hotels/:id/photos
       * @desc Add hotel photo
       * @access Private (Owner/HOST or ADMIN)
       */
      .post(
        "/:id/photos",
        async ({ user, params, body, set }) => {
          try {
            const photo = await addHotelPhoto(
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
          body: AddHotelPhotoSchema,
          detail: {
            tags: ["Hotels", "Host"],
            summary: "Add hotel photo",
            description: "Add a new photo to hotel gallery (Owner only)",
            security: [{ bearerAuth: [] }],
          },
        },
      )

      /**
       * @route GET /api/hotels/:id/photos
       * @desc Get hotel photos
       * @access Public
       */
      .get(
        "/:id/photos",
        async ({ params, set }) => {
          try {
            const photos = await getHotelPhotos(params.id);
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
            tags: ["Hotels"],
            summary: "Get hotel photos",
            description: "Get all photos of a hotel",
          },
        },
      )

      /**
       * @route PUT /api/hotels/:id/photos/order
       * @desc Update hotel photos order
       * @access Private (Owner/HOST or ADMIN)
       */
      .put(
        "/:id/photos/order",
        async ({ user, params, body, set }) => {
          try {
            const photos = await updateHotelPhotosOrder(
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
          body: UpdateHotelPhotoOrderSchema,
          detail: {
            tags: ["Hotels", "Host"],
            summary: "Update photos order",
            description:
              "Update the display order of hotel photos (Owner only)",
            security: [{ bearerAuth: [] }],
          },
        },
      )

      /**
       * @route DELETE /api/hotels/:id/photos/:photoId
       * @desc Delete hotel photo
       * @access Private (Owner/HOST or ADMIN)
       */
      .delete(
        "/:id/photos/:photoId",
        async ({ user, params, set }) => {
          try {
            await deleteHotelPhoto(params.id, user.id, params.photoId);
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
            tags: ["Hotels", "Host"],
            summary: "Delete hotel photo",
            description: "Delete a photo from hotel gallery (Owner only)",
            security: [{ bearerAuth: [] }],
          },
        },
      )

      // ====================== HOTEL AMENITIES ======================

      /**
       * @route POST /api/hotels/:id/amenities
       * @desc Add hotel amenity
       * @access Private (Owner/HOST or ADMIN)
       */
      .post(
        "/:id/amenities",
        async ({ user, params, body, set }) => {
          try {
            const amenity = await addHotelAmenity(
              params.id,
              user.id,
              body.name,
              body.icon,
            );
            set.status = 201;
            return {
              success: true,
              message: "Amenity added successfully",
              data: amenity,
            };
          } catch (error: any) {
            set.status = 400;
            return {
              success: false,
              error: error.message || "Failed to add amenity",
            };
          }
        },
        {
          params: t.Object({
            id: t.String(),
          }),
          body: AddHotelAmenitySchema,
          detail: {
            tags: ["Hotels", "Host"],
            summary: "Add hotel amenity",
            description: "Add a new amenity to hotel (Owner only)",
            security: [{ bearerAuth: [] }],
          },
        },
      )

      /**
       * @route GET /api/hotels/:id/amenities
       * @desc Get hotel amenities
       * @access Public
       */
      .get(
        "/:id/amenities",
        async ({ params, set }) => {
          try {
            const amenities = await getHotelAmenities(params.id);
            return {
              success: true,
              data: amenities,
            };
          } catch (error: any) {
            set.status = 400;
            return {
              success: false,
              error: error.message || "Failed to get amenities",
            };
          }
        },
        {
          params: t.Object({
            id: t.String(),
          }),
          detail: {
            tags: ["Hotels"],
            summary: "Get hotel amenities",
            description: "Get all amenities of a hotel",
          },
        },
      )

      /**
       * @route PUT /api/hotels/:id/amenities/:amenityId
       * @desc Update hotel amenity
       * @access Private (Owner/HOST or ADMIN)
       */
      .put(
        "/:id/amenities/:amenityId",
        async ({ user, params, body, set }) => {
          try {
            const amenity = await updateHotelAmenity(
              params.id,
              user.id,
              params.amenityId,
              body,
            );
            return {
              success: true,
              message: "Amenity updated successfully",
              data: amenity,
            };
          } catch (error: any) {
            set.status = 400;
            return {
              success: false,
              error: error.message || "Failed to update amenity",
            };
          }
        },
        {
          params: t.Object({
            id: t.String(),
            amenityId: t.String(),
          }),
          body: UpdateHotelAmenitySchema,
          detail: {
            tags: ["Hotels", "Host"],
            summary: "Update hotel amenity",
            description: "Update hotel amenity information (Owner only)",
            security: [{ bearerAuth: [] }],
          },
        },
      )

      /**
       * @route DELETE /api/hotels/:id/amenities/:amenityId
       * @desc Delete hotel amenity
       * @access Private (Owner/HOST or ADMIN)
       */
      .delete(
        "/:id/amenities/:amenityId",
        async ({ user, params, set }) => {
          try {
            await deleteHotelAmenity(params.id, user.id, params.amenityId);
            return {
              success: true,
              message: "Amenity deleted successfully",
            };
          } catch (error: any) {
            set.status = 400;
            return {
              success: false,
              error: error.message || "Failed to delete amenity",
            };
          }
        },
        {
          params: t.Object({
            id: t.String(),
            amenityId: t.String(),
          }),
          detail: {
            tags: ["Hotels", "Host"],
            summary: "Delete hotel amenity",
            description: "Delete an amenity from hotel (Owner only)",
            security: [{ bearerAuth: [] }],
          },
        },
      ),
  );
