# RESTful API Activity - [Your Name]

## Best Practices Implementation

**1. Environment Variables:**
- Why did we put `BASE_URI` in `.env` instead of hardcoding it?
- Answer: Putting `BASE_URI` in `.env` allows us to change the API version (e.g., from `/api/v1` to `/api/v2`) without modifying the source code. This follows the principle of separation of concerns—configuration is separate from logic. It also enables different environments (development, staging, production) to use different API paths without code changes. This is especially important for production deployments where configuration is injected via environment variables instead of being hardcoded.

**2. Resource Modeling:**
- Why did we use plural nouns (e.g., `/dishes`) for our routes?
- Answer: Using plural nouns (`/dishes` instead of `/dish`) follows REST API conventions and represents that we're accessing a collection of resources. This makes the API more intuitive and consistent—developers immediately understand that `GET /dishes` retrieves all dishes, while `GET /dishes/1` retrieves a single dish. Plural nouns also make it easier to scale the API by adding sub-resources like `/dishes/1/reviews` without confusion about whether we're dealing with a collection or a single item.

**3. Status Codes:**
- When do we use `201 Created` vs `200 OK`?
- Answer: We use `201 Created` exclusively for successful POST requests that create a new resource. This status code signals that not only was the request successful, but a new resource was added to the system. We use `200 OK` for successful GET requests (retrieving data), PUT requests (updating existing resources), and DELETE requests (when returning confirmation data). The distinction matters because `201` tells the client "something new was created," which is semantically important for API consumers.

- Why is it important to return `404` instead of just an empty array or a generic error?
- Answer: Returning `404 Not Found` is semantically correct and helps developers debug faster. A `404` specifically means "the resource you requested does not exist," which is different from "the resource exists but has no data." For example, `GET /dishes` returning an empty array (200) means the dishes collection is empty, which is normal. But `GET /dishes/999` returning `404` means dish #999 doesn't exist—a completely different scenario. This distinction prevents confusion and allows client applications to handle these cases differently (e.g., retry a 500 error but don't retry a 404).

**4. Testing:**
- (Paste a screenshot of a successful GET request here)

### Test Examples:

#### GET /api/v1/dishes (Success)
```bash
curl http://localhost:3000/api/v1/dishes