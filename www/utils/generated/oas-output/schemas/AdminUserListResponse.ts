/**
 * @schema AdminUserListResponse
 * type: object
 * description: SUMMARY
 * x-schemaName: AdminUserListResponse
 * required:
 *   - limit
 *   - offset
 *   - count
 *   - users
 * properties:
 *   limit:
 *     type: number
 *     title: limit
 *     description: The user's limit.
 *   offset:
 *     type: number
 *     title: offset
 *     description: The user's offset.
 *   count:
 *     type: number
 *     title: count
 *     description: The user's count.
 *   users:
 *     type: array
 *     description: The user's users.
 *     items:
 *       $ref: "#/components/schemas/AdminUser"
 * 
*/

