# I Didn't Buy It - Household Savings Tracker

## Project Overview

"I Didn't Buy It" is a household savings tracker app designed for a couple (Dylan and Kaitlin) to note times when they exercise restraint in random spending and track how much money they've cumulatively saved by not buying stuff.

### Key Features

- Track items not purchased and their prices
- Shared access for both users
- Attribution of savings to specific users
- Cumulative savings calculation
- Potential for future analytics

## Technical Stack

- Frontend: React (not yet implemented)
- Backend: Supabase (PostgreSQL database with built-in authentication and APIs)
- Hosting: TBD (Netlify suggested for simplicity)

## Backend Setup (Completed)

1. **Supabase Project**: Created a new project in Supabase.

2. **Database Table**: 
   - Table Name: `public.items`
   - Columns:
     - `id` (int8, primary key)
     - `created_at` (timestamptz, default: now())
     - `name` (text)
     - `price` (float8)
     - `user_id` (uuid, foreign key to auth.users)

3. **Row Level Security (RLS) Policy**:
   - Policy Name: "Policy with security definer functions"
   - Applied to: `public.items`
   - Policy: 
     ```sql
     auth.uid() IN (
       '',  -- Dylan's user ID
       ''   -- Kaitlin's user ID
     )
     ```
   - This policy allows both users to access all items while still tracking who added each item.

4. **Authentication**: 
   - Set up for two specific users (Dylan and Kaitlin).
   - Public sign-ups should be disabled to restrict access.

## Frontend Setup (To Be Implemented)

1. **React App Creation**: 
   - Use Create React App or Next.js to set up the project.

2. **Supabase Client Integration**:
   - Install Supabase client: `npm install @supabase/supabase-js`
   - Initialize client with project URL and anon key.

3. **Key Components to Implement**:
   - Authentication (Login/Logout)
   - Add Item Form
   - Item List Display
   - Total Savings Calculator

4. **Data Flow**:
   - Fetch items on component mount
   - Real-time updates using Supabase subscriptions
   - Add new items with user attribution

## Next Steps

1. Set up the React frontend project.
2. Implement authentication in the frontend.
3. Create components for adding and displaying items.
4. Implement real-time updates and calculations.
5. Style the application for a user-friendly experience.
6. Consider hosting options (e.g., Netlify for easy deployment).

## Development Approach

- Focus on simplicity and ease of use.
- Ensure both users can easily add and view all items.
- Keep the design clean and intuitive.
- Plan for future analytics features.

## Project Personality

The app should have a fun, encouraging tone that celebrates savings and mindful spending. Consider adding motivational messages or small animations to make tracking savings more enjoyable.

Remember, this is a personal tool for Dylan and Kaitlin to use together, so it should feel personalized and tailored to their needs.

## Additional Notes

- Regularly backup the Supabase database to prevent data loss.
- Consider implementing data export features for long-term record-keeping.
- As the app grows, think about adding categories or tags to items for more detailed analysis.