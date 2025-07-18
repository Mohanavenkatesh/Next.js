export async function GET(req, { params }) {

    const user = await params.user;

    return new Response(JSON.stringify({ id: user }))


}